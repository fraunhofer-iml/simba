import { Prisma } from '@prisma/client';
import { OrderLinesSeed, OrdersSeed, ServiceProcessesSeed } from '../../../../../seed';

export const createOrderQueryMock = <Prisma.OrderCreateInput>{
  totalAmountWithoutVat: OrdersSeed[0].totalAmountWithoutVat,
  vatCurrency: OrdersSeed[0].vatCurrency,
  buyer: { connect: { id: OrdersSeed[0].buyerId } },
  seller: { connect: { id: OrdersSeed[0].sellerId } },
  serviceProcess: {
    create: { dueCalendarWeek: ServiceProcessesSeed[0].dueCalendarWeek, dueYear: ServiceProcessesSeed[0].dueYear },
  },
  orderLines: {
    create: {
      requestedQuantity: OrderLinesSeed[0].requestedQuantity,
      item: {
        connect: {
          id: OrderLinesSeed[0].itemId,
        },
      },
    },
  },
};
