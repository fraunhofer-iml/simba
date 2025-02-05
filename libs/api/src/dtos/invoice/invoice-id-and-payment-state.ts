import { InvoiceIdAndPaymentStateAmqpDto } from '@ap3/amqp';
import { PaymentStatesEnum } from '@ap3/database';
import { ApiProperty } from '@nestjs/swagger';

export class InvoiceIdAndPaymentStateDto {
  @ApiProperty()
  invoiceId: string;
  @ApiProperty({
    type: String,
    enum: PaymentStatesEnum,
  })
  paymentStatus: string;

  constructor(invoiceId: string, paymentState: string) {
    this.invoiceId = invoiceId;
    this.paymentStatus = paymentState;
  }

  public toAMQPDto(): InvoiceIdAndPaymentStateAmqpDto {
    return <InvoiceIdAndPaymentStateAmqpDto>{
      invoiceId: this.invoiceId,
      paymentStatus: this.paymentStatus,
    };
  }
}
