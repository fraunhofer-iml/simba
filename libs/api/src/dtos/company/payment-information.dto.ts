import { PaymentInformationAmqpDto } from '@ap3/amqp';

export class PaymentInformationDto {
  id: string;
  iBAN: string;
  BIC: string;

  constructor(id: string, iBAN: string, BIC: string) {
    this.id = id;
    this.iBAN = iBAN;
    this.BIC = BIC;
  }

  public static fromAmqpDto(paymentInformationAmqpDto: PaymentInformationAmqpDto) {
    return new PaymentInformationDto(paymentInformationAmqpDto.id, paymentInformationAmqpDto.iBAN, paymentInformationAmqpDto.BIC);
  }
}
