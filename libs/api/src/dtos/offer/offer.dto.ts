import { ApiProperty } from '@nestjs/swagger';

export class OfferDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  creationDate: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  orderId: string;

  constructor(id: string, creationDate: string, price: number, status: string, orderId: string) {
    this.id = id;
    this.creationDate = creationDate;
    this.price = price;
    this.status = status;
    this.orderId = orderId;
  }
}
