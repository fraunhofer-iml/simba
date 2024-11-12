import { Prisma } from '@prisma/client';

export const createOrderQueryMock = <Prisma.OrderCreateInput>{
  totalAmountWithoutVat: null,
  vatCurrency: 'Euro',
  buyer: { connect: { id: 'cm349r6pw000408l8geee42b0' } },
  seller: { connect: { id: 'cm35m1g4u000008jo6jfwd6c4' } },
  serviceProcess: {
    create: { dueCalendarWeek: 7, dueYear: 2025 },
  },
  orderLines: {
    create: {
      requestedQuantity: 5,
      item: {
        connect: {
          id: 'prod1',
        },
      },
    },
  },
};
