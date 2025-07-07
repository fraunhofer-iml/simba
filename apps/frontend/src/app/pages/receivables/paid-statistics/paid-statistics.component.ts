/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaidStatisticsDto } from '@ap3/api';
import { FinancialRoles } from '@ap3/util';
import { TranslateService } from '@ngx-translate/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin, map, Subscription } from 'rxjs';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';
import { DiagramData } from './model/diagram-data';
import { PaidStatisticsUtil } from './paid-statistics.util';

@Component({
  selector: 'app-paid-statistics',
  templateUrl: './paid-statistics.component.html',
  styleUrl: './paid-statistics.component.scss',
})
export class PaidStatisticsComponent implements OnChanges {
  translation: Subscription;
  selectableYears: number[] = [];
  selectedYear!: number;
  volumeYAxis = 'y';
  percentageYAxis = 'y1';
  mixedChartOptions: ChartOptions = {};
  mixedChartData: ChartData<'bar' | 'line'> = { labels: [], datasets: [] };

  @Input({ required: true }) invoiceIds: string[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly translationService: TranslateService,
    private readonly authService: AuthService
  ) {
    this.initPaidStatisticsChart();
    this.translation = translationService.onLangChange
      .pipe(
        map(() => {
          this.updateLabelTranslations();
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.invoiceIds.length !== 0) {
      this.updateChartDataSet();
    }
  }

  initPaidStatisticsChart() {
    this.selectableYears = PaidStatisticsUtil.generateSelectableYears();
    this.selectedYear = this.selectableYears[0];
    this.mixedChartOptions = PaidStatisticsUtil.buildOptionsConfig();
    this.mixedChartData = PaidStatisticsUtil.buildDataset(
      this.translationService.instant('MonthLabels'),
      this.volumeYAxis,
      this.percentageYAxis
    );
    this.updateLabelTranslations();
  }

  getPaidStatistics(year: number) {
    const creditorData = this.invoiceService
      .getPaidStatistics(this.invoiceIds, FinancialRoles.CREDITOR, year)
      .pipe(map((paidDtos: PaidStatisticsDto[]) => new DiagramData(paidDtos)));

    const debtorData = this.invoiceService
      .getPaidStatistics(this.invoiceIds, FinancialRoles.DEBTOR, year)
      .pipe(map((paidDtos: PaidStatisticsDto[]) => new DiagramData(paidDtos)));

    return forkJoin({ creditorData, debtorData });
  }

  updateChartDataSet() {
    this.getPaidStatistics(this.selectedYear).subscribe((res) => {
      this.mixedChartData.datasets[0].data = res.creditorData.getPercentages();
      this.mixedChartData.datasets[1].data = res.creditorData.getTotalValues();
      this.mixedChartData.datasets[2].data = res.debtorData.getPercentages();
      this.mixedChartData.datasets[3].data = res.debtorData.getTotalValues();
      this.chart?.update();
    });
  }

  updateLabelTranslations() {
    if (this.authService.isContributor() || this.authService.isOperator()) {
      this.mixedChartData.datasets[0].label = this.translationService.instant(
        'Invoices.Statistics.PaidStatistics.CreditorPercentageChartLabel'
      );
      this.mixedChartData.datasets[0].hidden = false;
      this.mixedChartData.datasets[1].label = this.translationService.instant(
        'Invoices.Statistics.PaidStatistics.CreditorVolumeChartLabel'
      );
      this.mixedChartData.datasets[1].hidden = false;
    }
    if (this.authService.isCustomer() || this.authService.isOperator()) {
      this.mixedChartData.datasets[2].label = this.translationService.instant(
        'Invoices.Statistics.PaidStatistics.DebtorPercentageChartLabel'
      );
      this.mixedChartData.datasets[2].hidden = false;
      this.mixedChartData.datasets[3].label = this.translationService.instant('Invoices.Statistics.PaidStatistics.DebtorVolumeChartLabel');
      this.mixedChartData.datasets[3].hidden = false;
    }
    this.mixedChartData.labels = this.translationService.instant('MonthLabels');
    this.chart?.update();
  }

  toggleDatasetVisibility(datasetIndex: number) {
    if (this.mixedChartData.datasets[datasetIndex]) {
      this.mixedChartData.datasets[datasetIndex].hidden = !this.mixedChartData.datasets[datasetIndex].hidden;
      this.chart?.update();
    }
  }

  onYearSelection(year: number) {
    this.selectedYear = year;
    this.updateChartDataSet();
  }

  getCssColorClassVolume(label: string) {
    return label === this.mixedChartData.datasets[1].label
      ? 'paid-statistics-creditor-volume-color option'
      : 'paid-statistics-debtor-volume-color option';
  }
  getCssColorClassRate(label: string) {
    return label === this.mixedChartData.datasets[0].label
      ? 'paid-statistics-creditor-percentage-color option'
      : 'paid-statistics-debtor-percentage-color option';
  }
}
