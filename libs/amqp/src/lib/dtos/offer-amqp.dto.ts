import {Offer} from "@prisma/client";

export class OfferAmqpDto{
  id: string;
  creationDate: Date;
  price: number;
  status: string;
  orderId: string;

  constructor(id: string, creationDate: Date, price: number, status: string, orderId: string) {
    this.id = id;
    this.creationDate = creationDate;
    this.price = price;
    this.status = status;
    this.orderId = orderId;
  }

  public static fromPrismaEntity(offer: Offer): OfferAmqpDto{
    return <OfferAmqpDto> {
      id: offer.id,
      creationDate: offer.creationDate,
      price: offer.price,
      status: offer.status,
      orderId: offer.orderId,
    }
  }
}
