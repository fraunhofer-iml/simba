/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfferDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Context } from 'chartjs-plugin-datalabels';
import { formatCurrency } from '@angular/common';
import { PRICE_COMPONENT_COLORS } from '../../../shared/constants/diagram-colors';
import { FormatService } from '../../../shared/services/util/format.service';

export class CreateOrderUtils {
  static buildBarChartOptions(formatterService: FormatService): ChartOptions {
    return <ChartOptions>{
      responsive: true,
      maintainAspectRatio: true,
      layout: {
        padding: {
          top: 20,
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          fullSize: true,
          maxWidth: 200,
          labels: {
            font: {
              size: 14
            },
          },
        },
        labels: {
          boxWidth: 20,
          padding: 20,
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
        tooltip: {
          callbacks: {
            title: () => '',
            label: function (context: any) {
              const label = context.dataset.label ?? '';
              const formatted = formatCurrency(context.raw, formatterService.getCurrentLocaleFormatter(), '€', 'EUR', '1.2-2');
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

            return formatCurrency(sum, formatterService.getCurrentLocaleFormatter(), '€', 'EUR', '1.2-2');
          },
          font: {
            size: 14
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            callback: function (value: number) {
              return formatCurrency(value, formatterService.getCurrentLocaleFormatter(), '€', 'EUR', '1.0-0');
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

  static buildChartData(translate: TranslateService, offers: OfferDto[]) {
    return [
      {
        data: offers.map((offer) => offer.basicPrice),
        label: translate.instant('Offers.BasicPrice'),
        backgroundColor: PRICE_COMPONENT_COLORS.BASIC_PRICE,
        stack: 'a',
      },
      {
        data: offers.map((offer) => offer.utilization),
        label: translate.instant('Offers.Utilization'),
        backgroundColor: PRICE_COMPONENT_COLORS.UTILIZATION,
        stack: 'a',
      },
      {
        data: offers.map((offer) => offer.timeUntilProduction),
        label: translate.instant('Offers.TimeUntilProduction'),
        backgroundColor: PRICE_COMPONENT_COLORS.TIME_UNTIL_PRODUCTION,
        stack: 'a',
      },
    ];
  }
}
