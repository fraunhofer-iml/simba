import { InvoiceDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { DateFormatService } from '../shared/services/util/date-format.service';

export class Invoice {
  id: string;
  invoiceNumber: string;
  creditor: string;
  creditorId: string;
  totalAmountWithoutVat: string;
  invoiceDueDate: string;
  debtor: string;
  debtorId: string;
  paymentStatus: string;
  url: string;
  displayedStatus: string;
  currency: string;

  constructor(invoice: InvoiceDto, dateFormatService: DateFormatService, translate: TranslateService) {
    this.id = invoice.id;
    this.invoiceNumber = invoice.invoiceNumber;
    this.creditorId = invoice.creditorId;
    this.creditor = invoice.creditor;
    this.totalAmountWithoutVat = `${invoice.totalAmountWithoutVat.toFixed(2)}`;
    this.invoiceDueDate = dateFormatService.transformDateToCurrentLanguageFormat(invoice.invoiceDueDate);
    this.debtor = invoice.debtor;
    this.debtorId = invoice.debtorId;
    this.paymentStatus = invoice.paymentStatus;
    this.url = invoice.url;
    this.displayedStatus = invoice.paymentStatus;
    this.currency = invoice.currency;
  }

  public static convertToInvoice(invoices: InvoiceDto[], dateFormatService: DateFormatService, translate: TranslateService): Invoice[] {
    const flatInvoices: Invoice[] = [];
    invoices.forEach((invoice: InvoiceDto) => {
      flatInvoices.push(new Invoice(invoice, dateFormatService, translate));
    });
    return flatInvoices;
  }
}
