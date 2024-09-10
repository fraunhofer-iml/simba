import {Offer} from "@prisma/client";

export class OfferAmqpDto{
  id: string;
  creationDate: Date;
  price: number;
  status: string;
  orderId: string;
  // acceptedByOrderId: string;

  public static fromPrismaEntity(offer: Offer): OfferAmqpDto{
    return <OfferAmqpDto> {
      id: offer.id,
      creationDate: offer.creationDate,
      price: offer.price,
      status: offer.status,
      orderId: offer.orderId,
      // acceptedByOrderId: offer.acceptedByOrderId,
    }
  }
}
