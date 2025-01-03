import { InvoiceForZugferd } from '@ap3/database';
import { XMLBuilder } from 'fast-xml-parser';
import { PDFDocument } from 'pdf-lib';
import { Injectable, Logger } from '@nestjs/common';
import { invoiceTemplate } from './invoice-template';
import {
  AdditionalZugferd,
  BuyerZugferd,
  InvoiceZugferd,
  InvoiceZugferdEntity,
  ItemZugferd,
  SupplierZugferd,
} from './invoice-zugferd.entity';
import { zugferdTemplate } from './zugferd-template';

@Injectable()
export class InvoicesZugferdService {
  private readonly logger = new Logger(InvoicesZugferdService.name);

  public async generatePdf(invoice: InvoiceForZugferd): Promise<Uint8Array> {
    this.logger.verbose(`Creating ZUGFeRD pdf document for invoice #${invoice.id}`);
    const zugferdInvoice: InvoiceZugferdEntity = this.createZugferdEntity(invoice);
    const doc = invoiceTemplate(zugferdInvoice);

    const pdfDoc = await PDFDocument.load(doc.output('arraybuffer'));
    const zugferd = this.createZugferdXML(zugferdInvoice);
    const zugferdBase64 = Buffer.from(zugferd, 'binary').toString('base64');

    pdfDoc.attach(zugferdBase64, 'zugferd.xml');

    return await pdfDoc.save();
  }

  createZugferdXML(invoice: InvoiceZugferdEntity) {
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    };

    const builder = new XMLBuilder(options);

    return builder.build(zugferdTemplate(invoice));
  }

  private createZugferdEntity(invoice: any): InvoiceZugferdEntity {
    const vat = Number(invoice.vat) > 1 ? Number(invoice.vat) / 100 : Number(invoice.vat);
    const orderLines: ItemZugferd[] = this.createItemsForZugferd(invoice, vat);

    const additional: AdditionalZugferd = {
      paymentTerms: '10 Tage 2%; 60 Tage netto', //TODO AFFDS-199: Database
      vat: Number(invoice.vat) * 100,
    };
    const buyer: BuyerZugferd = {
      addressCity: invoice.debtor.city,
      addressStreet: invoice.debtor.address,
      addressZip: invoice.debtor.zip,
      legalIdentifier: invoice.debtor.commercialRegisterNumber, //TODO AFFDS-199: tbd
      name: invoice.debtor.name,
      countryCode: 'DE', //TODO AFFDS-199: database
    };

    let totalNetValue = 0;
    let totalGrossValue = 0;
    orderLines.forEach((i) => {
      totalNetValue += Number(i.totalAmountNet);
      totalGrossValue += Number(i.totalAmountGross);
    });

    const invoiceZugferd: InvoiceZugferd = {
      machineIds: invoice.serviceProcess.machines.toString(),
      machineNames: invoice.serviceProcess.machines.toString(), //TODO AFFDS-199: PO abklären
      contractReference: invoice.serviceProcess.order.id,
      date: invoice.creationDate,
      reference: invoice.invoiceNumber,
      totalAmountNet: totalNetValue,
      totalAmountGross: totalGrossValue,
      paymentDate: invoice.dueDate,
    };

    const supplier: SupplierZugferd = {
      addressCity: invoice.creditor.city,
      addressStreet: invoice.creditor.address,
      addressZip: invoice.creditor.zip,
      email: invoice.creditor.emailAddress,
      iban: invoice.creditor?.paymentInformation[0]?.IBAN, //TODO AFFDS-199: How to select payment information for invoice
      legalIdentifier: invoice.creditor.commercialRegisterNumber, //TODO AFFDS-199: Whats that
      name: invoice.creditor.name,
      phone: invoice.creditor.telephone,
      taxIdentifier: invoice.creditor.vatId,
      tradeRegisterNumber: invoice.creditor.commercialRegisterNumber,
      countryCode: 'DE', //TODO AFFDS-199: database
    };

    return new InvoiceZugferdEntity(additional, buyer, invoiceZugferd, orderLines, supplier);
  }

  private createItemsForZugferd(invoice: any, vat: number): ItemZugferd[] {
    const retVal: ItemZugferd[] = [];

    for (const orderLine of invoice.serviceProcess.order.orderLines) {
      retVal.push(<ItemZugferd>{
        articleName: orderLine.item.name,
        articleNumber: orderLine.item.id,
        currency: invoice.contractCurrency,
        quantity: Number(orderLine.requestedQuantity),
        totalAmountNet: Number(orderLine.lineTotalAmount),
        totalAmountGross: Number(orderLine.lineTotalAmount) * (1 + vat),
        unitPrice: Number(orderLine.netPrice),
      });
    }
    return retVal;
  }
}
