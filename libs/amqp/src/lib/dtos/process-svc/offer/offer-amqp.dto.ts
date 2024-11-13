import { Offer } from '@prisma/client';

export class OfferAmqpDto {
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

  public static fromPrismaEntities(offers: Offer[], orderId: string): OfferAmqpDto[] {
    const retVal: OfferAmqpDto[] = [];
    for (const offer of offers) {
      retVal.push(this.fromPrismaEntity(offer, orderId));
    }
    return retVal;
  }

  public static fromPrismaEntity(offer: Offer, orderId: string): OfferAmqpDto {
    return <OfferAmqpDto>{
      id: offer.id,
      creationDate: offer.creationDate,
      price: new Number(offer.price),
      status: offer.status,
      orderId: orderId,
    };
  }
}
