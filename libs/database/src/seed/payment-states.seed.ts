import { PaymentStatus } from '@prisma/client';
import { PaymentStatesEnum } from '../lib/constants';
import { TradeReceivablesSeed } from './trade-receivables.seed';

export const PaymentStatesSeed = <PaymentStatus[]>[
  {
    tradeReceivableId: TradeReceivablesSeed[0].id,
    status: PaymentStatesEnum.OPEN,
    timestamp: new Date('2024-10-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[0].id,
    status: PaymentStatesEnum.PAID,
    timestamp: new Date('2024-10-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[1].id,
    status: PaymentStatesEnum.OPEN,
    timestamp: new Date('2024-10-08T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[1].id,
    status: PaymentStatesEnum.PAID,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[2].id,
    status: PaymentStatesEnum.OPEN,
    timestamp: new Date('2024-10-10T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[2].id,
    status: PaymentStatesEnum.PAID,
    timestamp: new Date('2024-10-10T08:40:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[3].id,
    status: PaymentStatesEnum.OPEN,
    timestamp: new Date('2024-09-11T07:55:55.695Z'),
  }
];
