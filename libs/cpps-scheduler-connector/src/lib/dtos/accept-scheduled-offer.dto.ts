import { ScheduledProductDto } from './scheduled-product.dto';

export class AcceptScheduledOfferDto {
  cw: number;
  price: number;
  product: ScheduledProductDto;
  message?: string;

  constructor(cw: number, price: number, product: ScheduledProductDto, message?: string) {
    this.cw = cw;
    this.price = price;
    this.product = product;
    this.message = message;
  }
}
