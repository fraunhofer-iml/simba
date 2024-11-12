import { Order } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { ProductsSeed } from '../../../seed/products.seed';
import { OrderOverview } from '../../types/order-overview.types';
import { serviceProcessMock } from './service-process.mock';
import { serviceStatusMock } from './service-status.mock';

export const ordersMock = <Order[]>[
  {
    id: 'cm2uiedwn000108miftzcf209',
    documentIssueDate: new Date(),
    noteContent: '',
    buyerId: 'cm349r6pw000408l8geee42b0',
    sellerId: 'cm35m1g4u000008jo6jfwd6c4',
    referencedBuyerOrderLine: 'cm35p7fwt000008mg5bb43j4g',
    buyerOrderRefDocumentId: '202410291548-168990',
    sumOfLinesAmount: 5,
    totalAmountWithoutVat: null,
    vatCurrency: 'Euro',
    buyerAccountingRefId: 'ACC-202410291549-279246',
  },
  {
    id: 'cm2uiild9000108mnf080gcp7',
    documentIssueDate: new Date(),
    noteContent: '',
    buyerId: 'cm349r6pw000408l8geee42b0',
    sellerId: 'cm35m1g4u000008jo6jfwd6c4',
    referencedBuyerOrderLine: 'cm35p7lsv000108mgbav6go00',
    buyerOrderRefDocumentId: '202410291549-726762',
    sumOfLinesAmount: 5,
    totalAmountWithoutVat: null,
    vatCurrency: 'Euro',
    buyerAccountingRefId: 'ACC-202410291551-363148',
  },
];

export const orderOverviewMock: any[] = <OrderOverview[]>[
  {
    id: 'cm2uiedwn000108miftzcf209',
    documentIssueDate: new Date('2024-11-05T14:58:51.652Z'),

    orderLines: [{ item: ProductsSeed[0], requestedQuantity: new Decimal(5) }],
    serviceProcess: {
      dueCalendarWeek: serviceProcessMock[0].dueCalendarWeek,
      states: [serviceStatusMock[0]],
      dueYear: serviceProcessMock[0].dueYear,
      machines: serviceProcessMock[0].machines,
      offers: [],
      acceptedOffer: null,
      invoice: null,
    },
    buyer: { id: 'pt0001', name: 'Test Participant 1' },
    seller: { id: 'pt0002', name: 'Test Participant 2' },
  },
  {
    id: 'cm2uiild9000108mnf080gcp7',
    documentIssueDate: new Date('2024-11-05T14:58:51.652Z'),

    orderLines: [{ item: ProductsSeed[1], requestedQuantity: new Decimal(7) }],
    serviceProcess: {
      dueCalendarWeek: serviceProcessMock[1].dueCalendarWeek,
      dueYear: serviceProcessMock[1].dueYear,
      states: [serviceStatusMock[1]],
      machines: serviceProcessMock[1].machines,
      offers: [],
      acceptedOffer: null,
      invoice: null,
    },
    buyer: { id: 'pt0001', name: 'Test Participant 1' },
    seller: { id: 'pt0002', name: 'Test Participant 2' },
  },
];
