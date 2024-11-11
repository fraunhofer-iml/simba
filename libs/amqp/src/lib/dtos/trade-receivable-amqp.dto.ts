import { Invoice, PaymentStatus, TradeReceivable } from '@prisma/client';
import { PaymentStatusAmqpDto } from './payment-status-amqp.dto';

export class TradeReceivableAmqpDto {
  id: string;
  debtorId: string;
  creditorId: string;
  nft: string;
  totalAmountWithoutVat: number;
  status: PaymentStatusAmqpDto;
  invoiceId: string;
  creationDate: Date;

  constructor(
    id: string,
    debtorId: string,
    creditorId: string,
    nft: string,
    totalAmountWithoutVat: number,
    status: PaymentStatusAmqpDto,
    invoiceId: string,
    creationDate: Date
  ) {
    this.id = id;
    this.debtorId = debtorId;
    this.creditorId = creditorId;
    this.nft = nft;
    this.totalAmountWithoutVat = totalAmountWithoutVat;
    this.status = status;
    this.invoiceId = invoiceId;
    this.creationDate = creationDate;
  }

  public static fromPrismaEntity(tradeReceivable: TradeReceivable, invoice: Invoice, states: PaymentStatus[]): TradeReceivableAmqpDto {
    const firstState = this.getFirstState(states);
    const lastState = this.getLatestState(states);
    const creationDate = firstState ? firstState.timestamp : null;
    const currentState = lastState ? new PaymentStatusAmqpDto(lastState.status, lastState.timestamp) : null;

    return <TradeReceivableAmqpDto>{
      id: tradeReceivable.id,
      debtorId: invoice.debtorId,
      creditorId: invoice.creditorId,
      nft: tradeReceivable.nft,
      totalAmountWithoutVat: +invoice.totalAmountWithoutVat,
      status: currentState,
      invoiceId: invoice.id,
      creationDate: creationDate,
    };
  }

  private static getLatestState(states: PaymentStatus[]): PaymentStatus | null {
    let retVal: PaymentStatus | null = null;
    if (states && states.length > 0) {
      retVal = states.reduce((latest, current) => {
        return current.timestamp > latest.timestamp ? current : latest;
      });
    }
    return retVal;
  }

  private static getFirstState(states: PaymentStatus[]): PaymentStatus | null {
    let retVal: PaymentStatus | null = null;
    if (states && states.length > 0) {
      retVal = states.reduce((latest, current) => {
        return current.timestamp < latest.timestamp ? current : latest;
      });
    }
    return retVal;
  }
}
