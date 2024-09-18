import { ProductDto } from "../product";

export class OrderOverviewDto {
    id: string;
    product: ProductDto;
    amount: number;
    calendarMonth: string;
    creationDate: string;
    status: string;
    price: number;
    robots: string[];
    customerId: string;
  
    constructor(id: string, product: ProductDto, amount: number, calendarMonth: string, creationDate: string, status: string, price: number, robots: string[], customerId: string) {
      this.id = id;
      this.product = product;
      this.product = product;
      this.amount = amount;
      this.calendarMonth = calendarMonth;
      this.creationDate = creationDate;
      this.status = status;
      this.price = price;
      this.robots = robots;
      this.customerId = customerId;
    }
  }
    

