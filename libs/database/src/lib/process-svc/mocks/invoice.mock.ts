import { Company, Invoice, TradeReceivable } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { CompaniesSeed } from '../../../seed/companies.seed';
import { tradeReceivableMock } from './trade-receivable.mock';

export const invoiceMock = <(Invoice & { deptor: Company; creditor: Company; tradeReceivable: TradeReceivable[] })[]>[
  {
    id: 'cm35qzbc3000108l05e5vhzgo',
    invoiceNumber: 'INV-20241105-1',
    creationDate: new Date(),
    contractCurrency: '',
    measuringUnit: 'EA',
    netPricePerUnit: '45',
    totalAmountWithoutVat: new Decimal(9),
    vat: new Decimal(1),
    debtorId: CompaniesSeed[0].id,
    deptor: CompaniesSeed[0],
    creditorId: CompaniesSeed[1].id,
    creditor: CompaniesSeed[1],
    serviceProcessId: 'cm32tlpy0000108kyhv7vetzh',
    tradeReceivable: [tradeReceivableMock[0]],
  },
  {
    id: 'cm35r44b4000308l02ps0dz8i',
    invoiceNumber: 'INV-20241105-4',
    creationDate: new Date(),
    contractCurrency: '',
    measuringUnit: 'KG',
    netPricePerUnit: '78',
    totalAmountWithoutVat: new Decimal(8),
    vat: new Decimal(5),
    debtorId: CompaniesSeed[0].id,
    deptor: CompaniesSeed[0],
    creditorId: CompaniesSeed[1].id,
    creditor: CompaniesSeed[1],
    serviceProcessId: 'cm32to3ma000008jvf41teuc8',
    tradeReceivable: [tradeReceivableMock[1]],
  },
];
