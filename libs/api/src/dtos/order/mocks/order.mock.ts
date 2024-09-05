import { OrderDto } from '../order.dto';
import { ProductMocks } from '../../product';


export const OrderMock: OrderDto[] = [
  {
    id: 'O1',
    productId: ProductMocks[0].id,
    product: ProductMocks[0],
    amount: 1,
    calendarWeek: 50,
    creationDate: '2024-08-31T13:24:16.595Z',
    status: 'Accepted',
    price: 340.5,
    robots: ['M1', 'M2'],
    customerId: 'C1',
  },
  {
    id: 'O2',
    productId: ProductMocks[1].id,
    product: ProductMocks[0],
    amount: 1,
    calendarWeek: 52,
    creationDate: '2024-08-30T13:24:16.595Z',
    status: 'Accepted',
    price: 250.5,
    robots: ['M1'],
    customerId: 'C1',
  }
]
