import { ProductMocks } from '../../product';
import { OrderOverviewDto } from '../order-overview.dto';
import { OrderDto } from '../order.dto';

export const OrderMock: OrderDto[] = [
  {
    id: 'O1',
    productId: ProductMocks[0].id,
    amount: 1,
    year: 2024,
    calendarWeek: 52,
    creationDate: '2024-08-31T13:24:16.595Z',
    status: 'Accepted',
    acceptedOfferId: '',
    offerIds: [],
    robots: ['M1', 'M2'],
    customerId: 'pt0001',
    tradeReceivableId: '',
  },
  {
    id: 'O2',
    productId: ProductMocks[1].id,
    amount: 1,
    year: 2024,
    calendarWeek: 52,
    creationDate: '2024-08-30T13:24:16.595Z',
    status: 'Accepted',
    acceptedOfferId: '',
    offerIds: [],
    robots: ['M1', 'M2'],
    customerId: 'pt0001',
    tradeReceivableId: '',
  },
];

export const OrderOverviewMock: OrderOverviewDto[] = [
  {
    id: 'O1',
    product: ProductMocks[0],
    amount: 1,
    year: 2024,
    calendarWeek: 43,
    creationDate: '2024-08-31T13:24:16.595Z',
    status: 'Accepted',
    price: 5,
    robots: ['M1', 'M2'],
    customerId: 'pt0001',
  },
  {
    id: 'O2',
    product: ProductMocks[0],
    amount: 1,
    year: 2024,
    calendarWeek: 43,
    creationDate: '2024-08-31T13:24:16.595Z',
    status: 'Accepted',
    price: 7,
    robots: ['M2'],
    customerId: 'pt0001',
  },
];
