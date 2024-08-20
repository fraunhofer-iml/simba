export class OfferDto {
  id: string;
  creationDate: string;
  price: number;
  status: string;
  orderId: string;


  constructor(id: string, creationDate: string, price: number, status: string, orderId: string) {
    this.id = id;
    this.creationDate = creationDate;
    this.price = price;
    this.status = status;
    this.orderId = orderId;
  }
}
