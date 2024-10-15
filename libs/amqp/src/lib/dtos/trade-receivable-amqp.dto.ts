import { TradeReceivable } from '@prisma/client';

export class TradeReceivableAmqpDto {
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

  public static fromPrismaEntity(tradeReceivable: TradeReceivable): TradeReceivableAmqpDto {
    return <TradeReceivableAmqpDto>{
      id: tradeReceivable.id,
      debtorId: tradeReceivable.debtorId,
      nft: tradeReceivable.nft,
      value: tradeReceivable.value,
      orderId: tradeReceivable.orderId,
      status: tradeReceivable.status,
      invoiceId: tradeReceivable.invoiceId,
    };
  }
}
