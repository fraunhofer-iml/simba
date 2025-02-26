import { ScheduledPricesCwDto } from './scheduled-prices-cw.dto';

export class ScheduleOrderResponseDto {
  orderId: string;
  pricesPerCW: ScheduledPricesCwDto[];

  constructor(orderId: string, pricesPerCW: ScheduledPricesCwDto[]) {
    this.orderId = orderId;
    this.pricesPerCW = pricesPerCW;
  }
}
