import { ServiceStatusAmqpDto } from '../order';
import { OrderAmqpDto } from '../order/order-amqp.dto';

export const OrderAmqpMock = <OrderAmqpDto[]>[
  {
    id: 'cm2uiedwn000108miftzcf209',
    productId: 'prod1',
    amount: 5,
    year: 2024,
    calendarWeek: 5,
    creationDate: '2024-11-05T14:58:51.652Z',
    status: new ServiceStatusAmqpDto('Planned', '2024-11-05T14:58:51.652Z'),
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
    calendarWeek: 40,
    creationDate: '2024-08-30T13:24:16.595Z',
    status: new ServiceStatusAmqpDto('Accepted', '2024-09-01T13:24:16.595Z'),
    acceptedOfferId: undefined,
    offerIds: [],
    robots: [],
    customerId: 'cm35m1g4u000008jo6jfwd6c4',
    tradeReceivableId: undefined,
  },
];
