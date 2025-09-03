import { ChartDataset, ChartOptions, Plugin } from 'chart.js';

export interface CreateOrderChartEntity {
  legend: boolean;
  labels: string[];
  unitOfMeasurement: string | undefined;
  options: ChartOptions;
  plugins: Plugin[];
  data: ChartDataset<'bar'>[];
}
