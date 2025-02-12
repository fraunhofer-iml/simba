import { PaidStatisticsDto } from '@ap3/api';

export class DiagramData {
  private readonly percentages: number[];
  private readonly totalValues: number[];

  constructor(paidDtos: PaidStatisticsDto[]) {
    this.percentages = paidDtos.map((paidDto) => {
      return paidDto.percentageOfPaidDue;
    });
    this.totalValues = paidDtos.map((paidDto) => {
      return paidDto.totalValuePaid;
    });
  }

  getPercentages(): number[] {
    return this.percentages;
  }

  getTotalValues(): number[] {
    return this.totalValues;
  }
}
