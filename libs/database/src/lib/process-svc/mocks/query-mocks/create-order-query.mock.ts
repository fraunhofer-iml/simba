import { Prisma } from '@prisma/client';
import { OrderLinesSeed, OrdersSeed, ProductsSeed } from '../../../../seed';

export const createOrderQueryMock = <Prisma.OrderCreateInput>{
  totalAmountWithoutVat: OrdersSeed[0].totalAmountWithoutVat,
  vatCurrency: OrdersSeed[0].vatCurrency,
  buyer: { connect: { id: OrdersSeed[0].buyerId } },
  seller: { connect: { id: OrdersSeed[0].sellerId } },
  serviceProcess: {
    create: { dueCalendarWeek: 7, dueYear: 2025 },
  },
  orderLines: {
    create: {
      requestedQuantity: 5,
      item: {
        connect: {
          id: OrderLinesSeed[0].itemId,
        },
      },
    },
  },
};
