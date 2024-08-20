import { TradeReceivableDto } from '../trade-receivable.dto';

export const TradeReceivableMocks: TradeReceivableDto[] = [
  {
    id: "TR1",
    debtorId: "C1",
    nft: "0AE568163FA56486E",
    value: 15.8,
    orderId: 'O1',
    status: 'OPEN',
    invoiceId: 'I1',
  },
  {
    id: "TR2",
    debtorId: "C1",
    nft: "1AE5681633A56486E",
    value: 15.8,
    orderId: 'O2',
    status: 'OPEN',
    invoiceId: 'I2',
  }
]
