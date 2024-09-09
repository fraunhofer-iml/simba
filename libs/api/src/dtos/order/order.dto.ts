export class OrderDto {
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


  constructor(id: string, productId: string, amount: number, dueMonth: string, creationDate: string, status: string, acceptedOfferId: string, offerIds: string[], robots: string[], customerId: string, tradeReceivableId: string) {
    this.id = id;
    this.productId = productId;
    this.amount = amount;
    this.dueMonth = dueMonth;
    this.creationDate = creationDate;
    this.status = status;
    this.acceptedOfferId = acceptedOfferId;
    this.offerIds = offerIds;
    this.robots = robots;
    this.customerId = customerId;
    this.tradeReceivableId = tradeReceivableId;
  }
}

export type CreateOrderDto = Pick<OrderDto, 'productId' | 'amount' | 'dueMonth' | 'customerId'>;

export type UpdateOrderDto = Pick<OrderDto, 'id' | 'productId' | 'amount' | 'dueMonth' | 'customerId'>;


