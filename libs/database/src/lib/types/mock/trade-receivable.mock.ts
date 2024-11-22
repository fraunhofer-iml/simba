import { Prisma } from '@prisma/client';
import { PaymentStatesEnum } from '../../constants';
import { TradeReceivablePaymentStatusCount } from '../trade-receivable.types';

export const TradeReceivablePaymentStatusCountMock = <TradeReceivablePaymentStatusCount[]>[
  {
    status: PaymentStatesEnum.PAID.toString(),
    count: 3n,
    total_value: new Prisma.Decimal(15),
  },
  {
    status: PaymentStatesEnum.EXCEEDED.toString(),
    count: 4n,
    total_value: new Prisma.Decimal(15),
  },
  {
    status: PaymentStatesEnum.FINANCED.toString(),
    count: 5n,
    total_value: new Prisma.Decimal(25),
  },
  {
    status: PaymentStatesEnum.OPEN.toString(),
    count: 10n,
    total_value: new Prisma.Decimal(43.5),
  },
];
