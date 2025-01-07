export class DiagrammData {
  private percentages: number[];
  private totalValues: number[];

  constructor(percentages: number[], totalValues: number[]) {
    this.percentages = percentages;
    this.totalValues = totalValues;
  }

  getPercentages(): number[] {
    return this.percentages;
  }

  setPercentages(newPercentages: number[]) {
    this.percentages = newPercentages;
  }

  getTotalValues(): number[] {
    return this.totalValues;
  }

  setTotalValues(newTotalValues: number[]) {
    this.totalValues = newTotalValues;
  }
}
