export class AllInvoicesFilterAmqpDto {
  creditorId: string;
  debtorId: string;
  paymentState: string;

  constructor(creditorId: string, debtorId: string, paymentState: string) {
    this.creditorId = creditorId;
    this.debtorId = debtorId;
    this.paymentState = paymentState;
  }
}
