import { CreateOrderAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  productId: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  year: number;
  @ApiProperty()
  calendarWeek: number;
  @ApiProperty()
  customerId: string;

  constructor(productId: string, amount: number, year: number, calendarWeek: number, customerId: string) {
    this.productId = productId;
    this.amount = amount;
    this.year = year;
    this.calendarWeek = calendarWeek;
    this.customerId = customerId;
  }

  public toAMQPDto(operatorId: string, currency: string): CreateOrderAmqpDto {
    return <CreateOrderAmqpDto>{
      vatCurrency: currency,
      buyerId: this.customerId,
      sellerId: operatorId,
      productId: this.productId,
      quantity: this.amount,
      year: this.year,
      calendarWeek: this.calendarWeek,
      customerId: this.customerId,
    };
  }
}
