import { Offer, Order } from '@prisma/client';

export type OrderWithAcceptedOffer = Order & {
  serviceProcess: {
    acceptedOffer: Offer | null;
  } | null;
};
