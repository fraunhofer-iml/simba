export class NotPaidTrStatisticsAmqpDto{
  overdueTradeReceivableCount: number;
  overdueTradeReceivableValue: number;
  outstandingTradeReceivableCount: number;
  outstandingTradeReceivableValue: number;

  constructor(overdueTradeReceivableCount: number, overdueTradeReceivableValue: number, outstandingTradeReceivableCount: number, outstandingTradeReceivableValue: number) {
    this.overdueTradeReceivableCount = overdueTradeReceivableCount;
    this.overdueTradeReceivableValue = overdueTradeReceivableValue;
    this.outstandingTradeReceivableCount = outstandingTradeReceivableCount;
    this.outstandingTradeReceivableValue = outstandingTradeReceivableValue;
  }
}
