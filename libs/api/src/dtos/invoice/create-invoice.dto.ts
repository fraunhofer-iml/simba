import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty()
  orderId: string;

  constructor(orderId: string) {
    this.orderId = orderId;
  }
}
