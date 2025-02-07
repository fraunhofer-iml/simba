import { ServiceStatesEnum } from '@ap3/util';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  productId: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  year: number;
  @ApiProperty()
  calendarWeek: number;
  @ApiProperty()
  creationDate: string;
  @ApiProperty({
    type: String,
    enum: ServiceStatesEnum,
  })
  status: string;
  @ApiProperty()
  acceptedOfferId: string;
  @ApiProperty()
  offerIds: string[];
  @ApiProperty()
  robots: string[];
  @ApiProperty()
  customerId: string;
  @ApiProperty()
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
}
