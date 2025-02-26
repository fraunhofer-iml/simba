export class ScheduledPricesCwDto {
  cw: number;
  price: number;

  constructor(cw: number, price: number) {
    this.cw = cw;
    this.price = price;
  }
}
