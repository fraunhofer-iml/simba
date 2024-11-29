import { PaymentStatesSeed, TradeReceivablesSeed } from '@ap3/database';
import { CreateTradeReceivableAmqpDto } from '../create-trade-receivable-amqp.dto';

export const CreateTradeReceivableAMQPMock = new CreateTradeReceivableAmqpDto(
  PaymentStatesSeed[3].timestamp,
  TradeReceivablesSeed[0].nft,
  TradeReceivablesSeed[0].invoiceId
);
