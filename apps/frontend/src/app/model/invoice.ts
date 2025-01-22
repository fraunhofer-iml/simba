import { InvoiceDto } from '@ap3/api';
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

  constructor(invoice: InvoiceDto, dateFormatService: DateFormatService) {
    this.id = invoice.id;
    this.invoiceNumber = invoice.invoiceNumber;
    this.creditorId = invoice.creditorId;
    this.creditor = invoice.creditor;
    this.totalAmountWithoutVat = `${invoice.totalAmountWithoutVat.toFixed(2)}€`;
    this.invoiceDueDate = dateFormatService.transformDateToCurrentLanguageFormat(invoice.invoiceDueDate);
    this.debtor = invoice.debtor;
    this.debtorId = invoice.debtorId;
    this.paymentStatus = invoice.paymentStatus;
    this.url = invoice.url;
  }

  public static convertToInvoice(invoices: InvoiceDto[], dateFormatService: DateFormatService): Invoice[] {
    const flatInvoices: Invoice[] = [];
    invoices.forEach((invoice: InvoiceDto) => {
      const temp: Invoice = new Invoice(invoice, dateFormatService);
      flatInvoices.push(temp);
    });
    return flatInvoices;
  }
}
