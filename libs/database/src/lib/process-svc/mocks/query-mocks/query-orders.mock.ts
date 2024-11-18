import { Prisma } from '@prisma/client';
import { OrdersSeed } from '../../../../seed/orders.seed';

export const findSingleOrderMock = <Prisma.OrderWhereInput>{
  where: { id: String(OrdersSeed[0].id) },
  select: {
    id: true,
    documentIssueDate: true,
    orderLines: {
      select: {
        item: true,
        requestedQuantity: true,
      },
    },
    serviceProcess: {
      select: {
        dueCalendarWeek: true,
        dueYear: true,
        machines: true,
        states: true,
        offers: {
          select: {
            id: true,
          },
        },
        acceptedOffer: {
          select: {
            id: true,
            price: true,
          },
        },
        invoice: {
          select: {
            tradeReceivable: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    },
    buyer: {
      select: {
        id: true,
        name: true,
      },
    },
    seller: {
      select: {
        id: true,
        name: true,
      },
    },
  },
};

export const findAllOrdersQueryMock = <Prisma.OrderWhereInput>{
  where: {},
  select: {
    id: true,
    documentIssueDate: true,
    orderLines: {
      select: {
        item: true,
        requestedQuantity: true,
      },
    },
    serviceProcess: {
      select: {
        dueCalendarWeek: true,
        dueYear: true,
        machines: true,
        states: true,
        offers: {
          select: {
            id: true,
          },
        },
        acceptedOffer: {
          select: {
            id: true,
            price: true,
          },
        },
        invoice: {
          select: {
            tradeReceivable: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    },
    buyer: {
      select: {
        id: true,
        name: true,
      },
    },
    seller: {
      select: {
        id: true,
        name: true,
      },
    },
  },
};
