import { InvoiceSeed } from '@ap3/database';
import { CreateTradeReceivableDto } from '../create-trade-receivable.dto';

export const createTradeReceivableDtoMock: CreateTradeReceivableDto = new CreateTradeReceivableDto(
  'testnfthash',
  InvoiceSeed[0].id,
  new Date('2024-08-16T10:09:41.295Z')
);
