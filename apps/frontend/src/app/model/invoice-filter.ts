export class InvoiceFilter {
  debtorId?: string;
  creditorId?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  paymentStates?: string[];
  constructor(payer?: string, payee?: string, startDate?: Date, endDate?: Date, selectedFinancialStates?: string[]) {
    this.debtorId = payer;
    this.creditorId = payee;
    this.dueDateFrom = startDate;
    this.dueDateTo = endDate;
    this.paymentStates = selectedFinancialStates;
  }
}
