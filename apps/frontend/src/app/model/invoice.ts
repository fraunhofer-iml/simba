import { InvoiceDto } from '@ap3/api';
import { DateFormatService } from '../shared/formats/date-format.service';

export class Invoice {
  id: string | undefined;
  invoiceNumber: string | undefined;
  creditor: string | undefined;
  creditorId: string | undefined;
  totalAmountWithoutVat: string | undefined;
  invoiceDueDate: string | undefined;
  debtor: string | undefined;
  debtorId: string | undefined;
  paymentStatus: string | undefined;

  public static convertToInvoice(invoices: InvoiceDto[], dateFormatService: DateFormatService): Invoice[] {
    const flatInvoices: Invoice[] = [];
    invoices.forEach((invoice: InvoiceDto) => {
      const temp: Invoice = new Invoice();
      temp.invoiceNumber = invoice.invoiceNumber;
      temp.creditor = invoice.creditor;
      temp.totalAmountWithoutVat = `${invoice.totalAmountWithoutVat.toFixed(2)}€`;
      temp.invoiceDueDate = dateFormatService.transformDateToCurrentLanguageFormat(invoice.invoiceDueDate);
      temp.debtor = invoice.debtor;
      temp.paymentStatus = invoice.paymentStatus;
      flatInvoices.push(temp);
    });
    return flatInvoices;
  }
}
