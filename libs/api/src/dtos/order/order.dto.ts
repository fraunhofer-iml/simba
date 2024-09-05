import { ProductDto } from "../product";

export class OrderDto {
  id: string;
  productId: string;
  product: ProductDto;
  amount: number;
  calendarWeek: number;
  creationDate: string;
  status: string;
  price: number;
  robots: string[];
  customerId: string;

  constructor(id: string, productId: string, product: ProductDto, amount: number, calendarWeek: number, creationDate: string, status: string, price: number, robots: string[], customerId: string) {
    this.id = id;
    this.productId = productId;
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

export type CreateOrderDto = Pick<OrderDto, 'productId' | 'amount' | 'calendarWeek' | 'customerId'>;

export type UpdateOrderDto = Pick<OrderDto, 'id' | 'productId' | 'amount' | 'calendarWeek' | 'customerId'>;

