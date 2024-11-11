import { CreateTradeReceivableAmqpDto } from '@ap3/amqp';

export class CreateTradeReceivableDto {
  nft: string;
  invoiceId: string;
  statusTimestamp: Date;

  constructor(nft: string, invoiceId: string, statusTimestamp: Date) {
    this.nft = nft;
    this.invoiceId = invoiceId;
    this.statusTimestamp = statusTimestamp;
  }

  public toCreateTradeReceivableAmqpDto(): CreateTradeReceivableAmqpDto {
    return new CreateTradeReceivableAmqpDto(this.statusTimestamp, this.nft, this.invoiceId);
  }
}
