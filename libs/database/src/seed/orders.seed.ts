import { Order, Prisma } from '@prisma/client';
import { CompaniesSeed } from './companies.seed';
import { OrderLinesSeed } from './order-lines.seed';

export const OrdersSeed = <Order[]>[
  {
    id: 'o001',
    documentIssueDate: new Date('2024-10-09T07:55:55.695Z'),
    buyerId: CompaniesSeed[0].id,
    sellerId: CompaniesSeed[1].id,
    noteContent: '',
    referencedBuyerOrderLine: OrderLinesSeed[0].id,
    buyerOrderRefDocumentId: '202410291549-726762',
    sumOfLinesAmount: 5,
    totalAmountWithoutVat: new Prisma.Decimal(3.5),
    vatCurrency: 'Euro',
    buyerAccountingRefId: 'ACC-202410291551-363148',
  },
  {
    id: 'o002',
    documentIssueDate: new Date('2024-10-02T07:55:55.695Z'),
    buyerId: CompaniesSeed[0].id,
    sellerId: CompaniesSeed[1].id,
    noteContent: '',
    referencedBuyerOrderLine: OrderLinesSeed[1].id,
    buyerOrderRefDocumentId: '202410291548-168990',
    sumOfLinesAmount: 1,
    totalAmountWithoutVat: new Prisma.Decimal(3),
    vatCurrency: 'Euro',
    buyerAccountingRefId: 'ACC-202410291549-279246',
  },
  {
    id: 'o003',
    documentIssueDate: new Date('2024-10-02T07:55:55.695Z'),
    buyerId: CompaniesSeed[0].id,
    sellerId: CompaniesSeed[1].id,
    noteContent: '',
    referencedBuyerOrderLine: OrderLinesSeed[2].id,
    buyerOrderRefDocumentId: '202410291549-726762',
    sumOfLinesAmount: 1,
    totalAmountWithoutVat: new Prisma.Decimal(4),
    vatCurrency: 'Euro',
    buyerAccountingRefId: 'ACC-202410291551-363148',
  },
];
