import { OrderOverview } from '@ap3/database';
import { ServiceStatus } from '@prisma/client';
import { ServiceStatusAmqpDto } from './service-status-amqp.dto';

export class OrderAmqpDto {
  id: string;
  productId: string;
  amount: number;
  year: number;
  calendarWeek: number;
  creationDate: string;
  status: ServiceStatusAmqpDto;
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
    status: ServiceStatusAmqpDto,
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
    const lastState: ServiceStatus | null = this.getLatestState(order.serviceProcess?.states);
    const currentState = lastState
      ? new ServiceStatusAmqpDto(lastState.status, new Date(lastState.timestamp).toISOString())
      : new ServiceStatusAmqpDto('', '');

    return <OrderAmqpDto>{
      id: order.id,
      creationDate: order.documentIssueDate.toISOString(),
      amount: order.orderLines[0].requestedQuantity.toNumber(),
      status: currentState,
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

  private static getLatestState(states: ServiceStatus[] | undefined): ServiceStatus | null {
    let retVal: ServiceStatus | null = null;
    if (states && states.length > 0) {
      retVal = states.reduce((latest, current) => {
        return current.timestamp > latest.timestamp ? current : latest;
      });
    }
    return retVal;
  }
}
