import { TradeReceivableDto } from '../trade-receivable.dto';

export const TradeReceivableMocks: TradeReceivableDto[] = [
  {
    id: 'TR1',
    invoiceId: 'I1',
    creditorId: 'pt0001',
    creditor: 'Company A',
    totalAmountWithoutVat: 15.8,
    creationDate: '2024-08-31T13:24:16.595Z',
    debtorId: 'pt0002',
    debtor: 'Company B',
    paymentStatus: 'Open',
  },
  {
    id: 'TR2',
    invoiceId: 'I2',
    creditorId: 'pt0001',
    creditor: 'Company A',
    totalAmountWithoutVat: 13.8,
    creationDate: '2024-09-31T13:24:16.595Z',
    debtorId: 'pt0002',
    debtor: 'Company B',
    paymentStatus: 'Financed',
  },
];
