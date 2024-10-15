import {CreateOrderAmqpDto} from "@ap3/amqp";

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

  static toAMQPDto(createOrder: CreateOrderDto): CreateOrderAmqpDto{
    return <CreateOrderAmqpDto>{
      productId: createOrder.productId,
      amount: createOrder.amount,
      dueMonth: createOrder.dueMonth,
      customerId: createOrder.customerId,
    }
  }
}

export type CreateOrderDto = {
  productId: string;
  amount: number;
  dueMonth:string;
  customerId: string;
}

