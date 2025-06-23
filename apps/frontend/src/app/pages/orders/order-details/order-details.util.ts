import { TranslateService } from '@ngx-translate/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ORDER_DETAILS_DIAGRAM_COLORS } from '../../../shared/constants/diagram-colors';

export class OrderDetailsUtils {
  static buildDataset(doughnutParts: string[], data: number[]): ChartData<'doughnut'> {
    return {
      labels: doughnutParts,
      datasets: [
        {
          label: '',
          data: data,
          backgroundColor: [
            ORDER_DETAILS_DIAGRAM_COLORS.BASE_PRICE,
            ORDER_DETAILS_DIAGRAM_COLORS.UTILIZATION_PRICE,
            ORDER_DETAILS_DIAGRAM_COLORS.FIX_PRICE,
          ],
          type: 'doughnut',
        },
      ],
    };
  }

  static buildOptionsConfig(translationService: TranslateService): ChartOptions {
    return <ChartOptions>{
      type: 'doughnut',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'left',
        },
        datalabels: {
          color: '#fff',
          formatter: (value: number) => value + ' €',
          font: {
            weight: 'bold',
            size: 14,
          },
        },
        tooltip: {
          enabled: true,

          callbacks: {
            label: (tooltipItem: any) => {
              return '';
            },
            afterLabel: (tooltipItem: any) => {
              const index = tooltipItem.dataIndex;
              const descriptions = translationService.instant('Orders.Details.Diagram.DoughnutDescriptions');
              const rawText = `${descriptions[index]}`;
              let formattedText = rawText.replace(/\. /g, '.\n');
              formattedText = formattedText.replace(/\b(and|und)\b/gi, '\n$1');
              return formattedText;
            },
          },
        },
      },
    };
  }
}
