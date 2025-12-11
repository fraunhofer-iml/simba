/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { DatabaseUtil, InvoiceForZugferd } from '@ap3/database';
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

  private createZugferdEntity(invoice: InvoiceForZugferd): InvoiceZugferdEntity {
    const vat = Number(invoice.vat) > 1 ? Number(invoice.vat) / 100 : Number(invoice.vat);
    const orderLines: ItemZugferd[] = this.createItemsForZugferd(invoice, vat);

    const additional: AdditionalZugferd = {
      paymentTerms: invoice.paymentTerms,
      vat: vat * 100,
    };
    const buyer: BuyerZugferd = {
      addressCity: invoice.debtor.city,
      addressStreet: invoice.debtor.address,
      addressZip: invoice.debtor.zip,
      legalIdentifier: invoice.debtor.commercialRegisterNumber,
      name: invoice.debtor.name,
      countryCode: invoice.debtor.countryCode,
    };

    let totalNetValue = 0;
    let totalGrossValue = 0;
    orderLines.forEach((i) => {
      totalNetValue += Number(i.totalAmountNet);
      totalGrossValue += Number(i.totalAmountGross);
    });

    const invoiceZugferd: InvoiceZugferd = {
      machineIds: DatabaseUtil.ExtractMachineIdsFromServiceProcess(invoice.serviceProcess).toString(),
      machineNames: DatabaseUtil.ExtractMachineIdsFromServiceProcess(invoice.serviceProcess).toString(),
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
      iban: invoice.creditor?.paymentInformation[0]?.IBAN,
      legalIdentifier: invoice.creditor.commercialRegisterNumber,
      name: invoice.creditor.name,
      phone: invoice.creditor.telephone,
      taxIdentifier: invoice.creditor.vatId,
      tradeRegisterNumber: invoice.creditor.commercialRegisterNumber,
      countryCode: invoice.creditor.countryCode,
    };

    return new InvoiceZugferdEntity(additional, buyer, invoiceZugferd, orderLines, supplier);
  }

  private createItemsForZugferd(invoice: InvoiceForZugferd, vat: number): ItemZugferd[] {
    const retVal: ItemZugferd[] = [];

    for (const orderLine of invoice.serviceProcess.order.orderLines) {
      retVal.push(<ItemZugferd>{
        articleName: orderLine.item.name,
        articleNumber: orderLine.item.id,
        currency: invoice.contractCurrency,
        quantity: Number(orderLine.requestedQuantity),
        totalAmountNet: Number(invoice.totalAmountWithoutVat),
        totalAmountGross: Number(invoice.totalAmountWithoutVat) * (1 + vat),
        unitPrice: Number(invoice.netPricePerUnit),
      });
    }
    return retVal;
  }
}
