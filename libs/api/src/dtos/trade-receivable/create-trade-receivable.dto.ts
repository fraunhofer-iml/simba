import { CreateTradeReceivableAmqpDto } from '@ap3/amqp';

export class CreateTradeReceivableDto {
  debtorId: string;
  nft: string;
  value: number;
  invoiceId: string;
  creationDate: Date;
  statusTimestamp: Date;

  constructor(debtorId: string, nft: string, value: number, invoiceId: string, creationDate: Date, statusTimestamp: Date) {
    this.debtorId = debtorId;
    this.nft = nft;
    this.value = value;
    this.invoiceId = invoiceId;
    this.creationDate = creationDate;
    this.statusTimestamp = statusTimestamp;
  }

  public toCreateTradeReceivableAmqpDto(orderId: string): CreateTradeReceivableAmqpDto {
    return <CreateTradeReceivableAmqpDto>{
      creationDate: this.creationDate,
      statusTimestamp: this.statusTimestamp,
      orderId: orderId,
      nft: this.nft,
      debtorId: this.debtorId,
      value: this.value,
      invoiceId: this.invoiceId,
    };
  }
}
