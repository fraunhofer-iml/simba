export class InvoiceDto {

  invoiceNumber: string;
  creationDate: string;
  
  constructor(invoiceNumber: string, creationDate: string) {
    this.invoiceNumber = invoiceNumber;
    this.creationDate = creationDate;
  }
}
