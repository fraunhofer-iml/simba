export class CompanyAndPaymentStateAmqpDto {
  companyId: string;
  paymentState: string;

  constructor(companyId: string, paymentState: string) {
    this.companyId = companyId;
    this.paymentState = paymentState;
  }
}
