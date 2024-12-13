import { CompaniesSeed, OrderLinesSeed, ProductsSeed, ServiceProcessesSeed } from '@ap3/database';
import { CreateOrderDto } from '../create-order.dto';

export const createOrderMock = new CreateOrderDto(
  ProductsSeed[0].id,
  +OrderLinesSeed[0].requestedQuantity,
  ServiceProcessesSeed[0].dueYear,
  ServiceProcessesSeed[0].dueCalendarWeek,
  CompaniesSeed[0].id
);
