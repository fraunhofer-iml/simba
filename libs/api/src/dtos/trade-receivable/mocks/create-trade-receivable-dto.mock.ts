import { PaymentStatesSeed, TradeReceivablesSeed } from '@ap3/database';
import { CreateTradeReceivableDto } from '../create-trade-receivable.dto';

export const createTradeReceivableDtoMock: CreateTradeReceivableDto = new CreateTradeReceivableDto(
  TradeReceivablesSeed[0].nft,
  TradeReceivablesSeed[0].invoiceId,
  PaymentStatesSeed[3].timestamp
);
