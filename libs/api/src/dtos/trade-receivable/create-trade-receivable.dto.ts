import {CreateTradeReceivableAmqpDto} from "@ap3/amqp";

export class CreateTradeReceivableDto {
  debtorId: string;
  nft: string;
  value: number;
  invoiceId: string;

  constructor(debtorId: string, nft: string, value: number, invoiceId: string) {
    this.debtorId = debtorId;
    this.nft = nft;
    this.value = value;
    this.invoiceId = invoiceId;
  }

  public toTradeReceivableAmqpDto(orderId: string): CreateTradeReceivableAmqpDto{
    return <CreateTradeReceivableAmqpDto>{
      orderId: orderId,
      nft: this.nft,
      debtorId: this.debtorId,
      value: this.value,
      invoiceId: this.invoiceId,
    }
  }
}
