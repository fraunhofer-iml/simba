import { ApiProperty } from '@nestjs/swagger';

export class PaidTrStatisticsAmqpDto {
  @ApiProperty()
  yearAndMonth: string;
  @ApiProperty()
  totalValuePaidTR: number;
  @ApiProperty()
  percentageOfPaidDueTR: number;

  constructor(yearAndMonth: string, totalValuePaidTRPerMonth: number, percentageOfPaidDueTRPerMonth: number) {
    this.yearAndMonth = yearAndMonth;
    this.totalValuePaidTR = totalValuePaidTRPerMonth;
    this.percentageOfPaidDueTR = percentageOfPaidDueTRPerMonth;
  }
}
