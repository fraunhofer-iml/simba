import { PaidStatisticsAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';

export class PaidStatisticsDto {
  @ApiProperty()
  yearAndMonth: string;
  @ApiProperty()
  totalValuePaid: number;
  @ApiProperty()
  percentageOfPaidDue: number;

  constructor(yearAndMonth: string, totalValuePaidPerMonth: number, percentageOfPaidDuePerMonth: number) {
    this.yearAndMonth = yearAndMonth;
    this.totalValuePaid = totalValuePaidPerMonth;
    this.percentageOfPaidDue = percentageOfPaidDuePerMonth;
  }

  public static toPaidStatisticsDto(amqpDto: PaidStatisticsAmqpDto): PaidStatisticsDto {
    return new PaidStatisticsDto(amqpDto.yearAndMonth, amqpDto.totalValuePaid, amqpDto.percentageOfPaidDue);
  }
}
