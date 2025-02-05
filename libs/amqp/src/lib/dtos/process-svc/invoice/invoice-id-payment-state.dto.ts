import { Prisma } from '@prisma/client';

export class InvoiceIdAndPaymentStateAmqpDto {
  invoiceId: string;
  paymentStatus: string;

  constructor(invoiceId: string, paymentState: string) {
    this.invoiceId = invoiceId;
    this.paymentStatus = paymentState;
  }

  public toPrismaCreatePaymentStatusQuery(tradeReceivableId: string, statusTimestamp: Date): Prisma.PaymentStatusCreateInput {
    return <Prisma.PaymentStatusCreateInput>{
      status: this.paymentStatus,
      timestamp: statusTimestamp,
      tradeReceivable: { connect: { id: tradeReceivableId } },
    };
  }
}
