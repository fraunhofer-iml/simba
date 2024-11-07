import { OrderOverview } from '@ap3/database';
import { ServiceStatus } from '@prisma/client';

export class OrderAmqpDto {
  id: string;
  productId: string;
  amount: number;
  year: number;
  calendarWeek: number;
  creationDate: string;
  status: string;
  acceptedOfferId?: string;
  offerIds: string[];
  robots: string[];
  customerId: string;
  tradeReceivableId?: string;

  constructor(
    id: string,
    productId: string,
    amount: number,
    year: number,
    calendarWeek: number,
    creationDate: string,
    status: string,
    customerId: string
  ) {
    this.id = id;
    this.productId = productId;
    this.amount = amount;
    this.year = year;
    this.calendarWeek = calendarWeek;
    this.creationDate = creationDate;
    this.status = status;
    this.customerId = customerId;
    this.offerIds = [];
    this.robots = [];
  }

  public static fromPrismaEntity(order: OrderOverview): OrderAmqpDto {
    return <OrderAmqpDto>{
      id: order.id,
      creationDate: order.documentIssueDate.toISOString(),
      amount: order.serviceProcess?.acceptedOffer?.price.toNumber(),
      status: this.getLatestStateName(order.serviceProcess?.states),
      year: order.serviceProcess?.dueYear,
      calendarWeek: order.serviceProcess?.dueCalendarWeek,
      productId: order.orderLines[0].item.id,
      robots: order.serviceProcess?.machines,
      customerId: order.buyer.id,
      acceptedOfferId: order.serviceProcess?.acceptedOffer?.id,
      offerIds: order.serviceProcess?.offers.map((offer) => offer.id),
      tradeReceivableId: order.serviceProcess?.invoice?.tradeReceivable[0].id,
    };
  }

  private static getLatestStateName(states: ServiceStatus[] | undefined): string {
    let retVal = '';
    if (states && states.length > 0) {
      retVal = states.reduce((latest, current) => {
        return current.timestamp > latest.timestamp ? current : latest;
      }).status;
    }
    return retVal;
  }
}
