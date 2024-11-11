export class PaymentInformationDto {
  id: string;
  iBAN: string;
  BIC: string;

  constructor(id: string, iBAN: string, BIC: string) {
    this.id = id;
    this.iBAN = iBAN;
    this.BIC = BIC;
  }
}
