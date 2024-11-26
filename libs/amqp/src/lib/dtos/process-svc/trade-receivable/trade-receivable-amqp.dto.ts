import { Invoice, PaymentStatus, TradeReceivable } from '@prisma/client';
import { PaymentStatusAmqpDto } from './payment-status-amqp.dto';

export class TradeReceivableAmqpDto {
  id: string;
  debtorId: string;
  creditorId: string;
  nft: string;
  totalAmountWithoutVat: number;
  status: PaymentStatusAmqpDto;
  invoiceNumber: string;
  invoiceDueDate: Date;

  constructor(
    id: string,
    debtorId: string,
    creditorId: string,
    nft: string,
    totalAmountWithoutVat: number,
    status: PaymentStatusAmqpDto,
    invoiceNumber: string,
    invoiceDueDate: Date
  ) {
    this.id = id;
    this.debtorId = debtorId;
    this.creditorId = creditorId;
    this.nft = nft;
    this.totalAmountWithoutVat = totalAmountWithoutVat;
    this.status = status;
    this.invoiceNumber = invoiceNumber;
    this.invoiceDueDate = invoiceDueDate;
  }

  public static fromPrismaEntity(tradeReceivable: TradeReceivable, invoice: Invoice, states: PaymentStatus[]): TradeReceivableAmqpDto {
    const lastState = this.getLatestState(states);
    const currentState = lastState
      ? new PaymentStatusAmqpDto(lastState.status, lastState.timestamp)
      : new PaymentStatusAmqpDto('', new Date());

    return new TradeReceivableAmqpDto(
      tradeReceivable.id,
      invoice.debtorId ? invoice.debtorId : '',
      invoice.creditorId ? invoice.creditorId : '',
      tradeReceivable.nft,
      +invoice.totalAmountWithoutVat,
      currentState,
      invoice.invoiceNumber,
      invoice.dueDate
    );
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
}
