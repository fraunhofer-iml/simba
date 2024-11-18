import { CompaniesSeed, OrderLinesSeed, ProductsSeed, ServiceProcessesSeed } from '@ap3/database';
import { CreateOrderDto } from '../order.dto';

export const createOrderMock = <CreateOrderDto>{
  productId: ProductsSeed[0].id,
  amount: +OrderLinesSeed[0].requestedQuantity,
  year: ServiceProcessesSeed[0].dueYear,
  calendarWeek: ServiceProcessesSeed[0].dueCalendarWeek,
  customerId: CompaniesSeed[0].id,
};
