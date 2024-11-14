import { CompaniesSeed, createOrderQueryMock } from '@ap3/database';
import { CreateOrderAmqpDto } from '../order/create-order-amqp.dto';

export const createOrderAmqpDtoMock: any = <CreateOrderAmqpDto>{
  productId: 'prod1',
  amount: 5,
  year: 2025,
  calendarWeek: 7,
  customerId: 'cm349r6pw000408l8geee42b0',
  vatCurrency: 'Euro',
  buyerId: CompaniesSeed[0].id,
  sellerId: CompaniesSeed[1].id,
  toPrismaCreateEntity() {
    return createOrderQueryMock;
  },
};
