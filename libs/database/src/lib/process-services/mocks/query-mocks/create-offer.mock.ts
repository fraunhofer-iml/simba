import { OfferStatesEnum, OrderStatesEnum } from '@ap3/config';
import { Prisma } from '@prisma/client';

export const createOfferQuery = <Prisma.OfferCreateInput>{
  creationDate: '2024-08-16T10:09:41.295Z',
  price: 0.4,
  status: 'Open',
  serviceProcess: {
    connect: {
      orderId: 'cm2uiedwn000108miftzcf209',
    },
  },
};

export const setOrderStateToAcceptedQuery = <Prisma.OrderUpdateInput>{
  where: { id: String('cm2agsjs500009tf1hc9f5guo') },
  data: {
    status: OrderStatesEnum.PLANNED,
  },
};

export const setOfferStateToAcceptedQuery = <Prisma.OfferUpdateInput>{
  where: { id: 'cm2agsjsk00019tf1urzymlqu' },
  data: {
    states: {
      create: {
        status: OfferStatesEnum.ACCEPTED.toString(),
        timestamp: new Date(),
      },
    },
  },
};

export const setOfferStateToDeclinedQuery = <Prisma.OfferUpdateInput>{
  where: { id: 'cm2agsjsn00029tf1z3rqc9vp' },
  data: {
    status: OfferStatesEnum.REFUSED,
  },
};
