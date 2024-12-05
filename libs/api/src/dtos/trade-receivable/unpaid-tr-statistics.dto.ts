import { NotPaidTrStatisticsAmqpDto } from '@ap3/amqp';

export class UnpaidTrStatisticsDto {
  outStandingReceivables: number;
  outStandingReceivablesTotalValue: number;
  overdueReceivables: number;
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

  public static toUnpaidStatisticsDto(unpaidDto: NotPaidTrStatisticsAmqpDto): UnpaidTrStatisticsDto {
    return new UnpaidTrStatisticsDto(
      unpaidDto.outstandingTradeReceivableCount,
      unpaidDto.outstandingTradeReceivableValue,
      unpaidDto.overdueTradeReceivableCount,
      unpaidDto.overdueTradeReceivableValue
    );
  }
}
