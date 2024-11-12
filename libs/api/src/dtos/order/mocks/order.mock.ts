import { ProductMocks } from '../../product';
import { OrderOverviewDto } from '../order-overview.dto';
import { OrderDto } from '../order.dto';

export const OrderMock: OrderDto[] = [
  new OrderDto('O1', ProductMocks[0].id, 1, 2024, 52, '2024-08-31T13:24:16.595Z', 'Accepted', '', [], ['M1', 'M2'], 'pt0001', ''),
  new OrderDto('O2', ProductMocks[1].id, 1, 2024, 52, '2024-08-30T13:24:16.595Z', 'Accepted', '', [], ['M1', 'M2'], 'pt0001', ''),
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
