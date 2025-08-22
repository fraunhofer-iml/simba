/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChartData } from 'chart.js';
import { formatCurrency, PercentPipe } from '@angular/common';
import { PAID_STATISTICS_DIAGRAM_AND_LEGENDS_COLORS } from '../../../shared/constants/diagram-colors';
import { FormatService } from '../../../shared/services/util/format.service';

export class PaidStatisticsUtil {
  static generateSelectableYears(): number[] {
    const selectableYears: number[] = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= 10; i++) {
      selectableYears.push(currentYear - i);
    }
    return selectableYears;
  }

  static buildDataset(months: string[], volumeYAxis: string, percentageYAxis: string): ChartData<'bar' | 'line'> {
    return {
      labels: months,
      datasets: [
        {
          data: [],
          borderColor: PAID_STATISTICS_DIAGRAM_AND_LEGENDS_COLORS.CREDITOR_PERCENTAGES,
          backgroundColor: PAID_STATISTICS_DIAGRAM_AND_LEGENDS_COLORS.CREDITOR_PERCENTAGES,
          fill: false,
          tension: 0,
          yAxisID: percentageYAxis,
          type: 'line',
          hidden: true,
        },
        {
          data: [],
          borderColor: PAID_STATISTICS_DIAGRAM_AND_LEGENDS_COLORS.CREDITOR_VOLUME,
          backgroundColor: PAID_STATISTICS_DIAGRAM_AND_LEGENDS_COLORS.CREDITOR_VOLUME,
          yAxisID: volumeYAxis,
          type: 'bar',
          barThickness: 10,
          hidden: true,
        },
        {
          data: [],
          borderColor: PAID_STATISTICS_DIAGRAM_AND_LEGENDS_COLORS.DEBTOR_PERCENTAGES,
          backgroundColor: PAID_STATISTICS_DIAGRAM_AND_LEGENDS_COLORS.DEBTOR_PERCENTAGES,
          fill: false,
          tension: 0,
          yAxisID: percentageYAxis,
          type: 'line',
          hidden: true,
        },
        {
          data: [],
          borderColor: PAID_STATISTICS_DIAGRAM_AND_LEGENDS_COLORS.DEBTOR_VOLUME,
          backgroundColor: PAID_STATISTICS_DIAGRAM_AND_LEGENDS_COLORS.DEBTOR_VOLUME,
          yAxisID: volumeYAxis,
          type: 'bar',
          barThickness: 10,
          hidden: true,
        },
      ],
    };
  }

  static buildOptionsConfig(percentPipe: PercentPipe, formatterService: FormatService) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            callback: function (value: any) {
              return formatCurrency(value, formatterService.getCurrentLocaleFormatter(), '€', 'EUR', '1.2-2');
            },
          },
        },
        y1: {
          min: 0,
          max: 1,
          beginAtZero: true,
          position: 'right',
          grid: {
            display: false,
          },
          ticks: {
            stepSize: 0.2,
            callback: function (value: any) {
              return percentPipe.transform(value, '1.0-2', formatterService.getCurrentLocaleFormatter());
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (tooltipItem: any) => {
              const datasetLabel = tooltipItem.dataset.label || '';
              let dataPointValue: string | null = '';
              if (tooltipItem.datasetIndex === 1 || tooltipItem?.datasetIndex === 3) {
                dataPointValue = formatCurrency(tooltipItem.raw, formatterService.getCurrentLocaleFormatter(), '€', 'EUR', '1.2-2');
              } else {
                dataPointValue = percentPipe.transform(tooltipItem.raw, '1.0-2');
              }
              return `${datasetLabel}: ${dataPointValue} `;
            },
          },
        },
      },
    };
  }
}
