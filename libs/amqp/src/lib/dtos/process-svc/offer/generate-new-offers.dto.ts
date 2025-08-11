export class NewOffersRequestAmqpDto {
  orderId: string;
  cw: number;

  constructor(orderId: string, cw: number) {
    this.orderId = orderId;
    this.cw = cw;
  }
}
