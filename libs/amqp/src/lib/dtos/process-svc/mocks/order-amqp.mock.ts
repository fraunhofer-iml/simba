import { OrderAmqpDto } from '../../order-amqp.dto';

export const OrderAmqpMock = <OrderAmqpDto[]>[
  {
    id: 'O1',
    productId: 'P1',
    amount: 1,
    year: 2023,
    calendarWeek: 34,
    creationDate: '2024-08-31T13:24:16.595Z',
    status: 'Accepted',
    acceptedOfferId: '',
    offerIds: [],
    robots: ['M1', 'M2'],
    customerId: 'C1',
    tradeReceivableId: '',
  },
  {
    id: 'O2',
    productId: 'P1',
    amount: 1,
    year: 2024,
    calendarWeek: 40,
    creationDate: '2024-08-30T13:24:16.595Z',
    status: 'Accepted',
    acceptedOfferId: '',
    offerIds: [],
    robots: ['M1', 'M2'],
    customerId: 'C1',
    tradeReceivableId: '',
  },
];
