import { CompaniesSeed, OrderLinesSeed } from '@ap3/database';
import { Order } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const OrderMock = <Order>{
  id: 'o001',
  documentIssueDate: new Date(),
  buyerOrderRefDocumentId: '202410291549-726762',
  vatCurrency: 'EUR',
  totalAmountWithoutVat: new Decimal(3.5),
  orderLines: [OrderLinesSeed[0]],
  noteContent: '',
  referencedBuyerOrderLine: OrderLinesSeed[0].id,
  sumOfLinesAmount: 5,
  buyerId: CompaniesSeed[0].id,
  sellerId: CompaniesSeed[1].id,
  buyerAccountingRefId: 'ACC-202410291551-363148',
  serviceProcess: {
    id: 'sp001',
    dueCalendarWeek: 50,
    dueYear: 2024,
    scheduledDate: new Date(),
    orderId: 'o001',
    acceptedOfferId: null,
    acceptedOffer: null,
    machineAssignments: [],
    offers: [],
    states: [],
    invoices: [],
  },
  buyer: { id: 'pt0001', name: 'Test Company 01' },
  seller: { id: 'pt0002', name: 'Test Company 02' },
};
