import { Prisma } from '@prisma/client';
import { OffersSeed, ServiceProcessesSeed } from '../../../../seed';
import { OfferStatesEnum, ServiceStatesEnum } from '../../../constants';

export const createOfferQuery = <Prisma.OfferCreateInput>{
  creationDate: new Date('2024-08-16T10:09:41.295Z'),
  price: 0.4,
  status: OfferStatesEnum.OPEN,
  serviceProcess: {
    connect: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
  },
};

export const setOrderStateToAcceptedQuery = <Prisma.OrderUpdateInput>{
  where: { id: String(ServiceProcessesSeed[0].orderId) },
  data: {
    status: ServiceStatesEnum.PLANNED,
  },
};

export const setOfferStateToAcceptedQuery = <Prisma.OfferUpdateInput>{
  where: { id: OffersSeed[0] },
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
  where: { id: OffersSeed[3].id },
  data: {
    status: OfferStatesEnum.REFUSED,
  },
};
