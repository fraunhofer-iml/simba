import { Invoice, Prisma } from '@prisma/client';

export const InvoiceSeed = <Invoice[]>[
  {
    id: 'IV001',
    invoiceNumber: 'IV001',
    creationDate: new Date('2024-10-10T07:55:55.695Z'),
    contractCurrency: 'EUR',
    measuringUnit: 'Stück',
    netPricePerUnit: '10.0',
    totalAmountWithoutVat: new Prisma.Decimal(3),
    vat: new Prisma.Decimal(0.9),
    debtorId: 'pt0001',
    creditorId: 'pt0002',
    serviceProcessId: 'sp001',
  },
  {
    id: 'IV002',
    invoiceNumber: 'IV002',
    creationDate: new Date('2024-10-10T07:55:55.695Z'),
    contractCurrency: 'EUR',
    measuringUnit: 'Stück',
    netPricePerUnit: '20.0',
    totalAmountWithoutVat: new Prisma.Decimal(6.0),
    vat: new Prisma.Decimal(2.8),
    debtorId: 'pt0001',
    creditorId: 'pt0002',
    serviceProcessId: 'sp002',
  },
];
