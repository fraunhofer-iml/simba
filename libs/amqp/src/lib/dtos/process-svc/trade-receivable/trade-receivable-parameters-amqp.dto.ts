export class TRParamsCompanyIdAndPaymentState {
  companyId: string;
  paymentState: string;

  constructor(companyId: string, paymentState: string) {
    this.companyId = companyId;
    this.paymentState = paymentState;
  }
}

export class TRParamsCompanyIdAndYear {
  companyId: string;
  year: number;

  constructor(companyId: string, year: number) {
    this.companyId = companyId;
    this.year = year;
  }
}
