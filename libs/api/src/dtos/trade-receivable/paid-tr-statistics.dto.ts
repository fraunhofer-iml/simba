import { PaidTrStatisticsAmqpDto } from '@ap3/amqp';

export class PaidTrStatisticsDto {
  yearAndMonth: string;
  totalValuePaidTR: number;
  percentageOfPaidDueTR: number;

  constructor(yearAndMonth: string, totalValuePaidTRPerMonth: number, percentageOfPaidDueTRPerMonth: number) {
    this.yearAndMonth = yearAndMonth;
    this.totalValuePaidTR = totalValuePaidTRPerMonth;
    this.percentageOfPaidDueTR = percentageOfPaidDueTRPerMonth;
  }

  public static toPaidTrStatisiticsDto(amqpDto: PaidTrStatisticsAmqpDto): PaidTrStatisticsDto {
    return new PaidTrStatisticsDto(amqpDto.yearAndMonth, amqpDto.totalValuePaidTR, amqpDto.percentageOfPaidDueTR);
  }
}
