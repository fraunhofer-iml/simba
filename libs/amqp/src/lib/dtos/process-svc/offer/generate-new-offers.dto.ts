export class NewOffersRequestAmqpDto {
  orderId: string;
  cw: number;
  year: number;

  constructor(orderId: string, cw: number, year: number) {
    this.orderId = orderId;
    this.cw = cw;
    this.year = year;
  }
}
