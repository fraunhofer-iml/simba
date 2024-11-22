import { TradeReceivableAmqpDto } from '@ap3/amqp';

export class TradeReceivableDto {
  id: string;
  invoiceId: string;
  creditor: string;
  creditorId: string;
  totalAmountWithoutVat: number;
  creationDate: string;
  debtor: string;
  debtorId: string;
  paymentStatus: string;

  constructor(
    id: string,
    invoiceId: string,
    creditorId: string,
    creditor: string,
    totalAmountWithoutVat: number,
    creationDate: string,
    debtorId: string,
    debtor: string,
    paymentStatus: string
  ) {
    this.id = id;
    this.invoiceId = invoiceId;
    this.creditorId = creditorId;
    this.creditor = creditor;
    this.totalAmountWithoutVat = totalAmountWithoutVat;
    this.creationDate = creationDate;
    this.debtorId = debtorId;
    this.debtor = debtor;
    this.paymentStatus = paymentStatus;
  }

  public static toTradeReceivableDto(dto: TradeReceivableAmqpDto, creditor: string, debtor: string): TradeReceivableDto {
    return new TradeReceivableDto(
      dto.id,
      dto.invoiceId,
      dto.creditorId,
      creditor,
      dto.totalAmountWithoutVat,
      new Date(dto.creationDate).toISOString(),
      dto.debtorId,
      debtor,
      dto.status.status
    );
  }
}
