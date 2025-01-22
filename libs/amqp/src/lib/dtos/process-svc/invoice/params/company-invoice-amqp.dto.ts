export class CompanyAndInvoiceAmqpDto {
  companyId: string;
  invoiceId: string;

  constructor(companyId: string, invoiceId: string) {
    this.companyId = companyId;
    this.invoiceId = invoiceId;
  }
}
