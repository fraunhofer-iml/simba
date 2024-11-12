import { ServiceStatesEnum } from '@ap3/config';
import { OrderAmqpDto } from '../../order-amqp.dto';

export const OrderAmqpMock = <OrderAmqpDto[]>[
  {
    id: 'cm2uiedwn000108miftzcf209',
    productId: 'prod1',
    amount: 5,
    year: 2024,
    calendarWeek: 5,
    creationDate: '2024-11-05T14:58:51.652Z',
    status: ServiceStatesEnum.PLANNED,
    acceptedOfferId: undefined,
    offerIds: [],
    robots: ['cm36zvaom000108jk75746j7j', 'cm36zxzwf000408jker5cfzgf'],
    customerId: 'pt0001',
    tradeReceivableId: undefined,
  },
  {
    id: 'cm2uiild9000108mnf080gcp7',
    productId: 'prod1',
    amount: 4,
    year: 2024,
    calendarWeek: 30,
    creationDate: '2026-11-20T09:14:25.356Z',
    status: ServiceStatesEnum.OPEN,
    acceptedOfferId: undefined,
    offerIds: [],
    robots: [],
    customerId: 'cm35m1g4u000008jo6jfwd6c4',
    tradeReceivableId: undefined,
  },
];
