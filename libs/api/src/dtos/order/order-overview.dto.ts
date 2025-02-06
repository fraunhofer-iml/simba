import { OrderAmqpDto } from '@ap3/amqp';
import { ServiceStatesEnum } from '@ap3/database';
import { CurrenciesEnum } from '@ap3/util';
import { ApiProperty } from '@nestjs/swagger';
import { OfferDto } from '../offer';
import { ProductDto } from '../product';

export class OrderOverviewDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    type: String,
    description: 'Name of ordered product',
  })
  product: string;
  @ApiProperty({
    type: Number,
    description: 'Amount of ordered products',
  })
  amount: number;
  @ApiProperty({
    type: String,
    description: 'Planned calendar week for production',
  })
  calendarWeek: number;
  @ApiProperty({
    type: String,
    description: 'Planned year for production',
  })
  year: number;
  @ApiProperty({
    type: String,
    enum: ServiceStatesEnum,
  })
  status: string;
  @ApiProperty({
    type: String,
    example: '2025-04-05T14:30:00Z',
    description: 'Timestamp in ISO 8601 format',
  })
  statusTimestamp: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  robots: string[];
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  customerName: string;
  @ApiProperty({
    type: String,
    enum: CurrenciesEnum,
  })
  currency: string;

  constructor(
    id: string,
    product: string,
    amount: number,
    calendarWeek: number,
    year: number,
    status: string,
    statusTimestamp: string,
    price: number,
    robots: string[],
    customerId: string,
    customerName: string,
    currency: string
  ) {
    this.id = id;
    this.product = product;
    this.amount = amount;
    this.calendarWeek = calendarWeek;
    this.year = year;
    this.status = status;
    this.statusTimestamp = statusTimestamp;
    this.price = price;
    this.robots = robots;
    this.customerId = customerId;
    this.customerName = customerName;
    this.currency = currency;
  }

  public static toOrderOverviewDto(dto: OrderAmqpDto, productDto: ProductDto, offerDto: OfferDto, customerName: string): OrderOverviewDto {
    return new OrderOverviewDto(
      dto.id,
      productDto.name,
      dto.amount,
      dto.calendarWeek,
      dto.year,
      dto.status.status,
      dto.status.timestamp,
      offerDto ? offerDto.price : 0,
      dto.robots ? dto.robots : [],
      dto.customerId,
      customerName,
      dto.currency
    );
  }
}
