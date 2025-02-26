import { CompaniesSeed, OrderLinesSeed, OrdersSeed, ProductsSeed, ServiceProcessesSeed } from '@ap3/database';
import { CreateOrderAmqpDto } from '../index';

export const CreateOrderAmqpDtoWithoutPrismaConverterMock: CreateOrderAmqpDto = <CreateOrderAmqpDto>{
  productId: ProductsSeed[0].id,
  quantity: +OrderLinesSeed[0].requestedQuantity,
  year: ServiceProcessesSeed[0].dueYear,
  calendarWeek: ServiceProcessesSeed[0].dueCalendarWeek,
  customerId: CompaniesSeed[0].id,
  vatCurrency: OrdersSeed[0].vatCurrency,
  buyerId: CompaniesSeed[0].id,
  sellerId: CompaniesSeed[1].id,
};
