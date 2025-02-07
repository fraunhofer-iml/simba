import { Prisma } from '@prisma/client';
import { PaymentStatusMocks } from '../payment-status-mock';

export const CreatePaymentStatusQueryMocks: Prisma.PaymentStatusCreateInput[] = [
  <Prisma.PaymentStatusCreateInput>{
    status: PaymentStatusMocks[0].status,
    timestamp: PaymentStatusMocks[0].timestamp,
    tradeReceivable: { connect: { id: PaymentStatusMocks[0].tradeReceivableId } },
  },
  <Prisma.PaymentStatusCreateInput>{
    status: PaymentStatusMocks[1].status,
    timestamp: PaymentStatusMocks[0].timestamp,
    tradeReceivable: { connect: { id: PaymentStatusMocks[1].tradeReceivableId } },
  },
];
