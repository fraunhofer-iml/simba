import {Offer, Order} from "@prisma/client";

export type OrderWithAcceptedOffer = Order & {
  acceptedOffer: Offer | null;
}
