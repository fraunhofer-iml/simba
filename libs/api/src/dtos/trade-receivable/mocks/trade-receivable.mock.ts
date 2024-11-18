import { CompaniesSeed, InvoiceSeed, PaymentStatesSeed, TradeReceivablesSeed } from '@ap3/database';
import { TradeReceivableDto } from '../trade-receivable.dto';

export const TradeReceivableMocks: TradeReceivableDto[] = [
  new TradeReceivableDto(
    TradeReceivablesSeed[0].id,
    InvoiceSeed[0].id,
    CompaniesSeed[1].id,
    'Kreditor',
    +InvoiceSeed[0].totalAmountWithoutVat,
    InvoiceSeed[0].creationDate.toISOString(),
    CompaniesSeed[0].id,
    'Debitor',
    PaymentStatesSeed[1].status
  ),
  new TradeReceivableDto(
    TradeReceivablesSeed[1].id,
    InvoiceSeed[1].id,
    CompaniesSeed[1].id,
    'Kreditor',
    +InvoiceSeed[1].totalAmountWithoutVat,
    InvoiceSeed[1].creationDate.toISOString(),
    CompaniesSeed[0].id,
    'Debitor',
    PaymentStatesSeed[3].status
  ),
];
