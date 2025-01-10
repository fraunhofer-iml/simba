import { DatabaseUtil, OrderOverview } from '@ap3/database';
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

  public static fromPrismaEntity(order: OrderOverview, currentState: ServiceStatusAmqpDto): OrderAmqpDto {
    return <OrderAmqpDto>{
      id: order.id,
      creationDate: order.documentIssueDate.toISOString(),
      amount: order.orderLines[0].requestedQuantity.toNumber(),
      status: currentState,
      year: order.serviceProcess?.dueYear,
      calendarWeek: order.serviceProcess?.dueCalendarWeek,
      productId: order.orderLines[0].item.id,
      robots: DatabaseUtil.ExtractMachineIdsFromServiceProcess(order.serviceProcess),
      customerId: order.buyer.id,
      acceptedOfferId: order.serviceProcess?.acceptedOffer?.id,
      offerIds: order.serviceProcess?.offers.map((offer) => offer.id),
      tradeReceivableId: order.serviceProcess?.invoice?.tradeReceivable?.id,
    };
  }

  public static getLatestState(states: ServiceStatus[] | undefined): ServiceStatusAmqpDto | null {
    let retVal: ServiceStatusAmqpDto | null = null;
    if (states && states.length > 0) {
      const serviceStatePrisma: ServiceStatus = states.reduce((latest, current) => {
        return current.timestamp > latest.timestamp ? current : latest;
      });
      retVal = new ServiceStatusAmqpDto(serviceStatePrisma.status, new Date(serviceStatePrisma.timestamp).toISOString());
    }
    return retVal;
  }
}
