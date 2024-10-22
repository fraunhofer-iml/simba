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

  public static fromPrismaEntity(order: any): OrderAmqpDto {
    return <OrderAmqpDto>{
      id: order.id,
      creationDate: order.creationDate.toISOString(),
      amount: order.amount,
      status: order.status,
      year: order.year,
      calendarWeek: order.calendarWeek,
      productId: order.productId,
      robots: order.machines,
      customerId: order.participantId,
      acceptedOfferId: order.acceptedByOrderId,
      offerIds: order.offers,
      tradeReceivableId: order.tradeReceivableId,
    };
  }
}
