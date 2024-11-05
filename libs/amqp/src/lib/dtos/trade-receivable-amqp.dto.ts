import { Invoice, OrderStatus, TradeReceivable } from '@prisma/client';

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

  public static fromPrismaEntity(tradeReceivable: TradeReceivable, invoice: Invoice, status: OrderStatus): TradeReceivableAmqpDto {
    return <TradeReceivableAmqpDto>{
      id: tradeReceivable.id,
      debtorId: invoice.debtorId,
      nft: tradeReceivable.nft,
      value: new Number(invoice.totalAmountWithoutVat),
      orderId: status.orderId,
      status: status.status,
      invoiceId: invoice.id,
    };
  }
}
