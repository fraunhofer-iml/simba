import { TradeReceivableDto } from '../trade-receivable.dto';

export const TradeReceivableMocks: TradeReceivableDto[] = [
  new TradeReceivableDto('TR001', 'IV001', 'pt0002', 'Kreditor', 3, '2024-10-10T07:55:55.695Z', 'pt0001', 'Debitor', 'Financed'),
  new TradeReceivableDto('TR002', 'IV002', 'pt0002', 'Kreditor', 6, '2024-10-10T07:55:55.695Z', 'pt0001', 'Debitor', 'Paid'),
];
