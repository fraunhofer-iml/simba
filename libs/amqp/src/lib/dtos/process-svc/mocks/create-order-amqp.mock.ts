import { createOrderQueryMock } from '@ap3/database';
import { CreateOrderAmqpDto } from '../order/create-order-amqp.dto';

export const createOrderAmqpDtoMock: any = <CreateOrderAmqpDto>{
  productId: 'prod1',
  amount: 5,
  year: 2025,
  calendarWeek: 7,
  customerId: 'cm349r6pw000408l8geee42b0',
  vatCurrency: 'Euro',
  buyerId: 'cm349r6pw000408l8geee42b0',
  sellerId: 'cm35m1g4u000008jo6jfwd6c4',
  toPrismaCreateEntity() {
    return createOrderQueryMock;
  },
};
