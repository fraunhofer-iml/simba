import { Offer } from '@prisma/client';

export class OfferAmqpDto {
  id: string;
  creationDate: Date;
  price: number;
  status: string;
  orderId: string;
  plannedCalendarWeek?: number;
  decisionDate?: Date;

  constructor(
    id: string,
    creationDate: Date,
    price: number,
    status: string,
    orderId: string,
    plannedCalendarWeek?: number,
    decisionDate?: Date
  ) {
    this.id = id;
    this.creationDate = creationDate;
    this.price = price;
    this.status = status;
    this.orderId = orderId;
    this.plannedCalendarWeek = plannedCalendarWeek;
    this.decisionDate = decisionDate;
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
      decisionDate: offer.decisionDate ? offer.decisionDate : null,
      price: Number(offer.price),
      status: offer.status,
      orderId: orderId,
      plannedCalendarWeek: Number(offer.plannedCalendarWeek),
    };
  }
}
