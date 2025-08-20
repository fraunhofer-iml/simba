import { ApiProperty } from '@nestjs/swagger';

export class CreateNftDto {
  @ApiProperty()
  invoiceId: string;

  constructor(invoiceNumber: string) {
    this.invoiceId = invoiceNumber;
  }
}
