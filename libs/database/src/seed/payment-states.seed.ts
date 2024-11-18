import { PaymentStatesEnum } from '@ap3/config';
import { PaymentStatus } from '@prisma/client';
import { TradeReceivablesSeed } from './trade-receivables.seed';

export const PaymentStatesSeed = <PaymentStatus[]>[
  {
    tradeReceivableId: TradeReceivablesSeed[0].id,
    status: PaymentStatesEnum.OPEN,
    timestamp: new Date('2024-10-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[0].id,
    status: PaymentStatesEnum.FINANCED,
    timestamp: new Date('2024-10-13T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[1].id,
    status: PaymentStatesEnum.OPEN,
    timestamp: new Date('2024-10-11T07:55:55.695Z'),
  },
  {
    tradeReceivableId: TradeReceivablesSeed[1].id,
    status: PaymentStatesEnum.PAID,
    timestamp: new Date('2024-10-12T07:55:55.695Z'),
  },
];
