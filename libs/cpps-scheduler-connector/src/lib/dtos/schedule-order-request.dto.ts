import { ScheduledProductDto } from './scheduled-product.dto';

export class ScheduleOrderRequestDto {
  id: string;
  requestedCW: number;
  timestamp: Date;
  products: ScheduledProductDto[];

  constructor(id: string, requestedCW: number, timestamp: Date, products: ScheduledProductDto[]) {
    this.id = id;
    this.requestedCW = requestedCW;
    this.timestamp = timestamp;
    this.products = products;
  }
}
