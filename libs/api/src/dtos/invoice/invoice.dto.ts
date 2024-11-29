import { InvoiceAmqpDto } from '@ap3/amqp';

export class InvoiceDto {
  id: string;
  invoiceNumber: string;
  creditor: string;
  creditorId: string;
  totalAmountWithoutVat: number;
  invoiceDueDate: string;
  debtor: string;
  debtorId: string;
  paymentStatus: string;
  url: string;

  constructor(
    id: string,
    invoiceNumber: string,
    creditorId: string,
    creditor: string,
    totalAmountWithoutVat: number,
    invoiceDueDate: string,
    debtorId: string,
    debtor: string,
    paymentStatus: string,
    url: string
  ) {
    this.id = id;
    this.invoiceNumber = invoiceNumber;
    this.creditorId = creditorId;
    this.creditor = creditor;
    this.totalAmountWithoutVat = totalAmountWithoutVat;
    this.invoiceDueDate = invoiceDueDate;
    this.debtorId = debtorId;
    this.debtor = debtor;
    this.paymentStatus = paymentStatus;
    this.url = url;
  }

  public static toTradeReceivableDto(dto: InvoiceAmqpDto, creditor: string, debtor: string): InvoiceDto {
    return new InvoiceDto(
      dto.id,
      dto.invoiceNumber,
      dto.creditorId,
      creditor,
      dto.totalAmountWithoutVat,
      new Date(dto.invoiceDueDate).toISOString(),
      dto.debtorId,
      debtor,
      dto.status.status,
      dto.url
    );
  }
}
