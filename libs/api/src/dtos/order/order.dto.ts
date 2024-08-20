export class OrderDto {
  id: string;
  product: string;
  amount: number;
  calendarWeek: number;
  creationDate: string;
  status: string;
  price: number;
  robots: string[];
  customerId: string;

  constructor(id: string, product: string, amount: number, calendarWeek: number, creationDate: string, status: string, price: number, robots: string[], customerId: string) {
    this.id = id;
    this.product = product;
    this.amount = amount;
    this.calendarWeek = calendarWeek;
    this.creationDate = creationDate;
    this.status = status;
    this.price = price;
    this.robots = robots;
    this.customerId = customerId;
  }
}

export type CreateOrderDto = Pick<OrderDto, 'product' | 'amount' | 'calendarWeek'>;
