import { ApiProperty } from '@nestjs/swagger';
import { PaymentStates } from '@ap3/util';

export class UpdateNftPaymentStatusDto {
  @ApiProperty()
  invoiceNumber: string;
  @ApiProperty()
  paymentStatus: PaymentStates;

  constructor(invoiceNumber: string, paymentStatus: PaymentStates) {
    this.invoiceNumber = invoiceNumber;
    this.paymentStatus = paymentStatus;
  }
}
