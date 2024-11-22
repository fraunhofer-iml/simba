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
}
