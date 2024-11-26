import { TradeReceivableAmqpDto } from '@ap3/amqp';

export class TradeReceivableDto {
  id: string;
  invoiceNumber: string;
  creditor: string;
  creditorId: string;
  totalAmountWithoutVat: number;
  invoiceDueDate: string;
  debtor: string;
  debtorId: string;
  paymentStatus: string;

  constructor(
    id: string,
    invoiceNumber: string,
    creditorId: string,
    creditor: string,
    totalAmountWithoutVat: number,
    invoiceDueDate: string,
    debtorId: string,
    debtor: string,
    paymentStatus: string
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
  }

  public static toTradeReceivableDto(dto: TradeReceivableAmqpDto, creditor: string, debtor: string): TradeReceivableDto {
    return new TradeReceivableDto(
      dto.id,
      dto.invoiceNumber,
      dto.creditorId,
      creditor,
      dto.totalAmountWithoutVat,
      new Date(dto.invoiceDueDate).toISOString(),
      dto.debtorId,
      debtor,
      dto.status.status
    );
  }
}
