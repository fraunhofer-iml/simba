import { TranslateService } from '@ngx-translate/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Context } from 'chartjs-plugin-datalabels';
import { OFFERS_DIAGRAM_COLORS } from '../../../shared/constants/diagram-colors';
import { OfferPricingStatistic } from './model/offer-pricing-statistics';

export class CreateOrderUtils {
  static buildBarChartOptions(translate: TranslateService): ChartOptions {
    return <ChartOptions>{
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'right',
          fullSize: true,
          maxWidth: 200,
          labels: {
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        },
        tooltip: {
          callbacks: {
            title: () => '',
            label: function (context) {
              const value = context.raw;
              const label = context.dataset.label ?? '';
              const formatted = typeof value === 'number' ? value.toFixed(2) + ' €' : value;
              return `${label}: ${formatted}`;
            },
          },
        },
        datalabels: {
          anchor: 'end',
          align: 'end',
          formatter: (value: any, context: Context) => {
            const datasetIndex = context.datasetIndex;
            const index = context.dataIndex;
            const isLastDataset = context.chart.data.datasets.length - 1 === datasetIndex;
            if (!isLastDataset) return '';
            const sum = context.chart.data.datasets.reduce((acc: number, ds: ChartDataset) => {
              const val = ds.data[index];
              return typeof val === 'number' ? acc + val : acc;
            }, 0);

            return sum.toFixed(2) + ' €';
          },
          font: {
            weight: 'bold',
            size: 14,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: translate.instant('Offers.CalendarWeek'),
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return parseFloat(value.toString()).toFixed(2) + ' €';
            },
          },
        },
      },
    };
  }

  static buildChartLabels(translate: TranslateService, baseWeek: number) {
    const numberOfWeeks = 4;
    return Array.from({ length: numberOfWeeks }, (_, i) => `${translate.instant('CalendarWeek')} ${baseWeek + i}`);
  }

  static buildChartData(translate: TranslateService, fullStats: OfferPricingStatistic) {
    return [
      {
        data: fullStats.basePrice,
        label: translate.instant('Offers.BasePrice'),
        backgroundColor: OFFERS_DIAGRAM_COLORS.BASE_PRICE,
        stack: 'a',
      },
      {
        data: fullStats.utilization,
        label: translate.instant('Offers.Utilization'),
        backgroundColor: OFFERS_DIAGRAM_COLORS.UTILIZATION,
        stack: 'a',
      },
      {
        data: fullStats.timeUntilOrderBegins,
        label: translate.instant('Offers.TimeUntilOrderBegins'),
        backgroundColor: OFFERS_DIAGRAM_COLORS.TIME_UNTIL_ORDER_BEGINS,
        stack: 'a',
      },
    ];
  }
}
