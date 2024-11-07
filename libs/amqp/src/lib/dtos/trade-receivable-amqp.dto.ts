import { Invoice, PaymentStatus, TradeReceivable } from '@prisma/client';

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

  public static fromPrismaEntity(tradeReceivable: TradeReceivable, invoice: Invoice, states: PaymentStatus[]): TradeReceivableAmqpDto {
    return <TradeReceivableAmqpDto>{
      id: tradeReceivable.id,
      debtorId: invoice.debtorId,
      nft: tradeReceivable.nft,
      value: new Number(invoice.totalAmountWithoutVat),
      status: this.getLatestStateString(states),
      invoiceId: invoice.id,
    };
  }

  private static getLatestStateString(states: PaymentStatus[]): string {
    let retVal = '';
    if (states && states.length > 0) {
      retVal = states.reduce((latest, current) => {
        return current.timestamp > latest.timestamp ? current : latest;
      }).status;
    }
    return retVal;
  }
}
