import { PaymentStatesSeed, TradeReceivablesSeed } from '@ap3/database';
import { TradeReceivableAmqpDto } from '../trade-receivable-amqp.dto';

export const TradeReceivableAMQPMock = <TradeReceivableAmqpDto[]>[
  {
    id: TradeReceivablesSeed[0].id,
    nft: TradeReceivablesSeed[0].nft,
    status: [
      {
        status: PaymentStatesSeed[0].status,
        timestamp: PaymentStatesSeed[0].timestamp,
      },
      {
        status: PaymentStatesSeed[1].status,
        timestamp: PaymentStatesSeed[1].timestamp,
      },
    ],
  },
  {
    id: TradeReceivablesSeed[1].id,
    nft: TradeReceivablesSeed[1].nft,
    status: [
      {
        status: PaymentStatesSeed[2].status,
        timestamp: PaymentStatesSeed[2].timestamp,
      },
      {
        status: PaymentStatesSeed[3].status,
        timestamp: PaymentStatesSeed[3].timestamp,
      },
    ],
  },
];
