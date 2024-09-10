export class OrderAmqpDto {
  id: string;
  productId: string;
  amount: number;
  dueMonth: string;
  creationDate: string;
  status: string;
  acceptedOfferId: string;
  offerIds: string[];
  robots: string[];
  customerId: string;
  tradeReceivableId: string;

  public static fromPrismaEntity(order: any): OrderAmqpDto{
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
    }
  }
}
