export class PaidTrStatisticsAmqpDto {
  yearAndMonth: string;
  totalValuePaidTR: number;
  percentageOfPaidDueTR: number;

  constructor(yearAndMonth: string, totalValuePaidTRPerMonth: number, percentageOfPaidDueTRPerMonth: number) {
    this.yearAndMonth = yearAndMonth;
    this.totalValuePaidTR = totalValuePaidTRPerMonth;
    this.percentageOfPaidDueTR = percentageOfPaidDueTRPerMonth;
  }
}
