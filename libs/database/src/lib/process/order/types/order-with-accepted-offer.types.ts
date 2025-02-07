import { Offer, Order, OrderLine, ServiceStatus } from '@prisma/client';

export type OrderWithAcceptedOffer = Order & {
  orderLines: OrderLine[] | null;
} & {
  serviceProcess: {
    acceptedOffer: Offer | null;
    states: ServiceStatus[] | null;
  } | null;
};
