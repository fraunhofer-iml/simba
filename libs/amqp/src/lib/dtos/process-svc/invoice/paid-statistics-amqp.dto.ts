export class PaidStatisticsAmqpDto {
  yearAndMonth: string;
  totalValuePaid: number;
  percentageOfPaidDue: number;

  constructor(yearAndMonth: string, totalValuePaidPerMonth: number, percentageOfPaidDuePerMonth: number) {
    this.yearAndMonth = yearAndMonth;
    this.totalValuePaid = totalValuePaidPerMonth;
    this.percentageOfPaidDue = percentageOfPaidDuePerMonth;
  }
}
