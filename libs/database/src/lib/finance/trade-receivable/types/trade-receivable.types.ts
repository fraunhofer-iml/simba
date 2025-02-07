import { Prisma } from '@prisma/client';

export type TradeReceivablePaymentStatusCount = {
  status: string;
  count: bigint;
  total_value: Prisma.Decimal;
};
