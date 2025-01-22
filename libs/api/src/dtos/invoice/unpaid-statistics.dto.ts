import { NotPaidStatisticsAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';

export class UnpaidStatisticsDto {
  @ApiProperty()
  outStandingReceivables: number;
  @ApiProperty()
  outStandingReceivablesTotalValue: number;
  @ApiProperty()
  overdueReceivables: number;
  @ApiProperty()
  overdueReceivablesTotalValue: number;

  constructor(
    outStandingReceivables: number,
    outStandingReceivablesTotalValue: number,
    overdueReceivables: number,
    overdueReceivablesTotalValue: number
  ) {
    this.outStandingReceivables = outStandingReceivables;
    this.outStandingReceivablesTotalValue = outStandingReceivablesTotalValue;
    this.overdueReceivables = overdueReceivables;
    this.overdueReceivablesTotalValue = overdueReceivablesTotalValue;
  }

  public static toUnpaidStatisticsDto(unpaidDto: NotPaidStatisticsAmqpDto): UnpaidStatisticsDto {
    return new UnpaidStatisticsDto(
      unpaidDto.outstandingTradeReceivableCount,
      unpaidDto.outstandingTradeReceivableValue,
      unpaidDto.overdueTradeReceivableCount,
      unpaidDto.overdueTradeReceivableValue
    );
  }
}
