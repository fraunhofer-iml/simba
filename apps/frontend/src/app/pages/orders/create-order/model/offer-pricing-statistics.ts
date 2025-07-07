export class OfferPricingStatistic {
  timeUntilOrderBegins: number[];
  basePrice: number[];
  utilization: number[];

  constructor(timeUntilOrderBegins: number[], basePrice: number[], utilization: number[]) {
    this.timeUntilOrderBegins = timeUntilOrderBegins;
    this.basePrice = basePrice;
    this.utilization = utilization;
  }
}
