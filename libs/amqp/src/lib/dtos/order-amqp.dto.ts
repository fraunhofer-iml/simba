export class OrderAmqpDto {
  id: string;
  productId: string;
  amount: number;
  dueMonth: string;
  creationDate: string;
  status: string;
  acceptedOfferId?: string;
  offerIds: string[];
  robots: string[];
  customerId: string;
  tradeReceivableId?: string;

  constructor(id: string, productId: string, amount: number, dueMonth: string, creationDate: string, status: string, customerId: string) {
    this.id = id;
    this.productId = productId;
    this.amount = amount;
    this.dueMonth = dueMonth;
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
      dueMonth: order.dueMonth,
      productId: order.productId,
      robots: order.machines,
      customerId: order.participantId,
      acceptedOfferId: order.acceptedByOrderId,
      offerIds: order.offers,
      tradeReceivableId: order.tradeReceivableId,
    };
  }
}
