import { Prisma, TradeReceivable } from '@prisma/client';
import { PaymentStatesEnum } from '../../constants';
import { TradeReceivablePaymentStatusCount } from '../trade-receivable.types';
import { TradeReceivablesSeed } from './../../../seed';

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

export const TradeReceivableMocks: TradeReceivable[] = [
  <TradeReceivable>{
    id: TradeReceivablesSeed[0].id,
    nft: TradeReceivablesSeed[0].nft,
    invoiceId: TradeReceivablesSeed[0].invoiceId,
  },
  <TradeReceivable>{
    id: TradeReceivablesSeed[1].id,
    nft: TradeReceivablesSeed[1].nft,
    invoiceId: TradeReceivablesSeed[1].invoiceId,
  },
];
