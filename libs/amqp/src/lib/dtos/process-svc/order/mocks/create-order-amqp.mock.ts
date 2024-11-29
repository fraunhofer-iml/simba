import { CompaniesSeed, createOrderQueryMock, OrderLinesSeed, OrdersSeed, ProductsSeed, ServiceProcessesSeed } from '@ap3/database';
import { CreateOrderAmqpDto } from '../create-order-amqp.dto';

export const createOrderAmqpDtoMock: any = <CreateOrderAmqpDto>{
  productId: ProductsSeed[0].id,
  amount: +OrderLinesSeed[0].requestedQuantity,
  year: ServiceProcessesSeed[0].dueYear,
  calendarWeek: ServiceProcessesSeed[0].dueCalendarWeek,
  customerId: CompaniesSeed[0].id,
  vatCurrency: OrdersSeed[0].vatCurrency,
  buyerId: CompaniesSeed[0].id,
  sellerId: CompaniesSeed[1].id,
  toPrismaCreateEntity() {
    return createOrderQueryMock;
  },
};
