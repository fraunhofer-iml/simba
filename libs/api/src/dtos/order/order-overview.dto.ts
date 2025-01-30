import { OrderAmqpDto } from '@ap3/amqp';
import { CurrenciesEnum } from '@ap3/config';
import { ServiceStatesEnum } from '@ap3/database';
import { ApiProperty } from '@nestjs/swagger';
import { OfferDto } from '../offer';
import { ProductDto } from '../product';

export class OrderOverviewDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  product: ProductDto;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  year: number;
  @ApiProperty()
  calendarWeek: number;
  @ApiProperty({
    type: String,
    example: '2025-04-05T14:30:00Z',
    description: 'Timestamp in ISO 8601 format',
  })
  creationDate: string;
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
    product: ProductDto,
    amount: number,
    year: number,
    calendarWeek: number,
    creationDate: string,
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
    this.year = year;
    this.calendarWeek = calendarWeek;
    this.creationDate = creationDate;
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
      productDto,
      dto.amount,
      dto.year,
      dto.calendarWeek,
      dto.creationDate,
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
