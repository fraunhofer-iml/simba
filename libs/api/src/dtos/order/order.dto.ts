import { CreateOrderAmqpDto } from '@ap3/amqp';

export class OrderDto {
  id: string;
  productId: string;
  amount: number;
  year: number;
  calendarWeek: number;
  creationDate: string;
  status: string;
  acceptedOfferId: string;
  offerIds: string[];
  robots: string[];
  customerId: string;
  tradeReceivableId: string;

  constructor(
    id: string,
    productId: string,
    amount: number,
    year: number,
    calendarWeek: number,
    creationDate: string,
    status: string,
    acceptedOfferId: string,
    offerIds: string[],
    robots: string[],
    customerId: string,
    tradeReceivableId: string
  ) {
    this.id = id;
    this.productId = productId;
    this.amount = amount;
    this.year = year;
    this.calendarWeek = calendarWeek;
    this.creationDate = creationDate;
    this.status = status;
    this.acceptedOfferId = acceptedOfferId;
    this.offerIds = offerIds;
    this.robots = robots;
    this.customerId = customerId;
    this.tradeReceivableId = tradeReceivableId;
  }

  static toAMQPDto(createOrder: CreateOrderDto, vatCurrency: string, buyerId: string, sellerId: string): CreateOrderAmqpDto {
    return <CreateOrderAmqpDto>{
      vatCurrency: vatCurrency,
      buyerId: buyerId,
      sellerId: sellerId,
      productId: createOrder.productId,
      amount: createOrder.amount,
      year: createOrder.year,
      calendarWeek: createOrder.calendarWeek,
      customerId: createOrder.customerId,
    };
  }
}

export type CreateOrderDto = {
  productId: string;
  amount: number;
  year: number;
  calendarWeek: number;
  customerId: string;
};
