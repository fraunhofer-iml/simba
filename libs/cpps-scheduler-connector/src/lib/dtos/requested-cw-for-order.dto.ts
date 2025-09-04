export class RequestedCwForOrderDto {
  orderId: string;
  cw: number;
  year: number;

  constructor(orderId: string, cw: number, year: number) {
    this.orderId = orderId;
    this.cw = cw;
    this.year = year;
  }
}
