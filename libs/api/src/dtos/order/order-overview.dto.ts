import {ProductDto} from "../product";
import {OrderAmqpDto} from "@ap3/amqp";
import {OfferDto} from "../offer";

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

  public static toOrderOverviewDto(dto: OrderAmqpDto, productDto: ProductDto, offerDto: OfferDto): OrderOverviewDto {
    return new OrderOverviewDto(
      dto.id,
      productDto,
      dto.amount,
      dto.dueMonth,
      dto.creationDate,
      dto.status,
      offerDto ? offerDto.price : 0,
      dto.robots ? dto.robots : [],
      dto.customerId
    );
  }
}
