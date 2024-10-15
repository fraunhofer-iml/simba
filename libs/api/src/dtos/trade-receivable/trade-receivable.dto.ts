import {TradeReceivableAmqpDto} from "@ap3/amqp";

export class TradeReceivableDto {
  id: string;
  debtorId: string;
  nft: string;
  value: number;
  orderId: string;
  status: string;
  invoiceId: string;

  constructor(id: string, debtorId: string, nft: string, value: number, orderId: string, status: string, invoiceId: string) {
    this.id = id;
    this.debtorId = debtorId;
    this.nft = nft;
    this.value = value;
    this.orderId = orderId;
    this.status = status;
    this.invoiceId = invoiceId;
  }

  public static toTradeReceivableDto(dto: TradeReceivableAmqpDto){
    return new TradeReceivableDto(dto.id, dto.debtorId, dto.nft, dto.value, dto.orderId, dto.status, dto.invoiceId);
  }
}
