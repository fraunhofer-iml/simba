import { TranslateService } from '@ngx-translate/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin, map, Observable, Subscription } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { TradeReceivableService } from '../../../shared/services/trade-receivable/trade-receivable.service';

@Component({
  selector: 'app-paid-statistics',
  templateUrl: './paid-statistics.component.html',
  styleUrl: './paid-statistics.component.scss',
})
export class PaidStatisticsComponent {
  selectableYears: number[];
  selectedYear: number;
  translation: Subscription;

  mixedChartOptions: ChartOptions = {};
  mixedChartData: ChartData<'bar' | 'line'> = { labels: [], datasets: [] };
  mixedChartType: ChartType = 'bar';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private readonly tradeReceivableService: TradeReceivableService,
    private readonly translationService: TranslateService
  ) {
    this.selectableYears = this.generateSelectableYears();
    this.selectedYear = this.selectableYears[0];
    this.buildOptionsConfig();
    this.buildDataConfig().subscribe((config) => {
      this.mixedChartData = config;
    });
    this.translation = translationService.onLangChange
      .pipe(
        map(() => {
          this.updateLabelTranslations();
        })
      )
      .subscribe();
  }

  getPaidStatistics(year: number) {
    return this.tradeReceivableService.getPaidTradeReceivablesStatistics(year).pipe(
      map((paidDtos) => {
        const percentages = paidDtos.map((paidDto) => {
          return paidDto.percentageOfPaidDueTR;
        });
        const totalValues = paidDtos.map((paidDto) => {
          return paidDto.totalValuePaidTR;
        });
        return { percentages: percentages, totalValues: totalValues };
      })
    );
  }

  getLabelTranslations() {
    return forkJoin({
      volumeChartLabel: this.translationService.get('VolumeChartLabel'),
      percentageChartLabel: this.translationService.get('PercentageChartLabel'),
      monthLabels: this.translationService.get('MonthLabels'),
    });
  }

  updateChartDataByYear() {
    this.getPaidStatistics(this.selectedYear).subscribe((res) => {
      this.mixedChartData.datasets[0].data = res.percentages;
      this.mixedChartData.datasets[1].data = res.totalValues;
      this.chart?.update();
    });
  }

  updateLabelTranslations() {
    this.getLabelTranslations().subscribe((res) => {
      this.mixedChartData.datasets[0].label = res.percentageChartLabel;
      this.mixedChartData.datasets[1].label = res.volumeChartLabel;
      this.mixedChartData.labels = res.monthLabels;
      this.chart?.update();
    });
  }

  generateSelectableYears(): number[] {
    const selectableYears: number[] = [];
    const currentyear = new Date().getFullYear();
    for (let i = 0; i <= 10; i++) {
      selectableYears.push(currentyear - i);
    }
    return selectableYears;
  }

  onYearSelection(year: number) {
    this.selectedYear = year;
    this.updateChartDataByYear();
  }

  buildDataConfig(): Observable<ChartData<'bar' | 'line'>> {
    return forkJoin({
      labels: this.getLabelTranslations(),
      data: this.getPaidStatistics(this.selectedYear),
    }).pipe(
      map((res) => {
        return {
          labels: res.labels.monthLabels,
          datasets: [
            {
              label: res.labels.percentageChartLabel,
              data: res.data.percentages,
              borderColor: '#3c9c66',
              fill: false,
              tension: 0,
              yAxisID: 'y1',
              type: 'line',
            },
            {
              label: res.labels.volumeChartLabel,
              data: res.data.totalValues,
              backgroundColor: '#3c3c9c',
              yAxisID: 'y',
              type: 'bar',
              barThickness: 10,
            },
          ],
        };
      })
    );
  }

  buildOptionsConfig() {
    this.mixedChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            callback: function (value) {
              return value.toLocaleString() + '€';
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
            callback: function (value) {
              return (Number(value) * 100).toLocaleString() + '%';
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
          position: 'left',
          labels: {
            boxWidth: 20,
            padding: 15,
          },
        },
      },
    };
  }
}
