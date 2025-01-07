import { PaidTrStatisticsDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin, map, Observable, Subscription } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { FinancialRoles } from '../../../shared/constants/financial-roles';
import { DIAGRAMM_COLORS } from '../../../shared/enums/diagramm-colors';
import { USERROLES } from '../../../shared/enums/user-roles';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FinancialRoleService } from '../../../shared/services/financial-role/financial-role.service';
import { TradeReceivableService } from '../../../shared/services/trade-receivable/trade-receivable.service';
import { DiagrammData } from './model/diagramm-data';

@Component({
  selector: 'app-paid-statistics',
  templateUrl: './paid-statistics.component.html',
  styleUrl: './paid-statistics.component.scss',
})
export class PaidStatisticsComponent {
  financialRole: string;
  userRole: string;
  selectableYears: number[];
  selectedYear: number;
  translation: Subscription;

  mixedChartOptions: ChartOptions = {};
  mixedChartData: ChartData<'bar' | 'line'> = { labels: [], datasets: [] };
  mixedChartType: ChartType = 'bar';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private readonly tradeReceivableService: TradeReceivableService,
    private readonly translationService: TranslateService,
    private readonly financialRoleService: FinancialRoleService,
    private readonly authService: AuthService
  ) {
    this.userRole = this.authService.getCurrentlyLoggedInUserRole();
    this.financialRole = this.financialRoleService.getFinancialRole();
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

  getPaidStatisticsForOthers(year: number) {
    return this.tradeReceivableService.getPaidTradeReceivablesStatistics(this.financialRole, year).pipe(
      map((paidDtos) => {
        const percentages = paidDtos.map((paidDto) => {
          return paidDto.percentageOfPaidDueTR;
        });
        const totalValues = paidDtos.map((paidDto) => {
          return paidDto.totalValuePaidTR;
        });
        return new DiagrammData(percentages, totalValues);
      })
    );
  }

  getPaidStatisticsForHost(year: number) {
    return forkJoin({
      creditorData: this.tradeReceivableService.getPaidTradeReceivablesStatistics(FinancialRoles.CREDITOR, year).pipe(
        map((paidDtos: PaidTrStatisticsDto[]) => {
          const percentages = paidDtos.map((paidDto) => {
            return paidDto.percentageOfPaidDueTR;
          });
          const totalValues = paidDtos.map((paidDto) => {
            return paidDto.totalValuePaidTR;
          });
          return new DiagrammData(percentages, totalValues);
        })
      ),
      debtorData: this.tradeReceivableService.getPaidTradeReceivablesStatistics(FinancialRoles.DEBTOR, year).pipe(
        map((paidDtos: PaidTrStatisticsDto[]) => {
          const percentages = paidDtos.map((paidDto) => {
            return paidDto.percentageOfPaidDueTR;
          });
          const totalValues = paidDtos.map((paidDto) => {
            return paidDto.totalValuePaidTR;
          });
          return new DiagrammData(percentages, totalValues);
        })
      ),
    });
  }

  getLabelTranslationsForOthers() {
    return forkJoin({
      volumeChartLabel: this.translationService.get('VolumeChartLabel'),
      percentageChartLabel: this.translationService.get('PercentageChartLabel'),
      monthLabels: this.translationService.get('MonthLabels'),
    });
  }

  getLabelTranslationsForHost() {
    return forkJoin({
      debtorVolumeChartLabel: this.translationService.get('DebtorVolumeChartLabel'),
      debtorPercentageChartLabel: this.translationService.get('DebtorPercentageChartLabel'),
      creditorVolumeChartLabel: this.translationService.get('CreditorVolumeChartLabel'),
      creditorPercentageChartLabel: this.translationService.get('CreditorPercentageChartLabel'),
      monthLabels: this.translationService.get('MonthLabels'),
    });
  }

  updateChartDataByYear() {
    if (this.authService.isAdmin()) {
      this.getPaidStatisticsForHost(this.selectedYear).subscribe((res) => {
        this.mixedChartData.datasets[0].data = res.creditorData.getPercentages();
        this.mixedChartData.datasets[1].data = res.creditorData.getTotalValues();
        this.mixedChartData.datasets[2].data = res.debtorData.getPercentages();
        this.mixedChartData.datasets[3].data = res.debtorData.getTotalValues();
        this.chart?.update();
      });
    } else {
      this.getPaidStatisticsForOthers(this.selectedYear).subscribe((res) => {
        this.mixedChartData.datasets[0].data = res.getPercentages();
        this.mixedChartData.datasets[1].data = res.getTotalValues();
        this.chart?.update();
      });
    }
  }

  updateLabelTranslations() {
    if (this.userRole === USERROLES.ADMIN) {
      this.getLabelTranslationsForHost().subscribe((res) => {
        this.mixedChartData.datasets[0].label = res.creditorPercentageChartLabel;
        this.mixedChartData.datasets[1].label = res.creditorVolumeChartLabel;
        this.mixedChartData.datasets[2].label = res.debtorPercentageChartLabel;
        this.mixedChartData.datasets[3].label = res.debtorVolumeChartLabel;
        this.mixedChartData.labels = res.monthLabels;
        this.chart?.update();
      });
    } else {
      this.getLabelTranslationsForOthers().subscribe((res) => {
        this.mixedChartData.datasets[0].label = res.percentageChartLabel;
        this.mixedChartData.datasets[1].label = res.volumeChartLabel;
        this.mixedChartData.labels = res.monthLabels;
        this.chart?.update();
      });
    }
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

  buildDataConfig() {
    if (this.authService.isAdmin()) {
      return this.buildDataConfigForHost();
    } else {
      return this.buildDataConfigForOthers();
    }
  }

  buildDataConfigForOthers(): Observable<ChartData<'bar' | 'line'>> {
    return forkJoin({
      labels: this.getLabelTranslationsForOthers(),
      data: this.getPaidStatisticsForOthers(this.selectedYear),
    }).pipe(
      map((res) => {
        return {
          labels: res.labels.monthLabels,
          datasets: [
            {
              label: res.labels.percentageChartLabel,
              data: res.data.getPercentages(),
              borderColor: DIAGRAMM_COLORS.CREDITOR_PERCENTAGES,
              fill: false,
              tension: 0,
              yAxisID: 'y1',
              type: 'line',
            },
            {
              label: res.labels.volumeChartLabel,
              data: res.data.getTotalValues(),
              backgroundColor: DIAGRAMM_COLORS.CREDITOR_VALUES,
              yAxisID: 'y',
              type: 'bar',
              barThickness: 10,
            },
          ],
        };
      })
    );
  }

  buildDataConfigForHost(): Observable<ChartData<'bar' | 'line'>> {
    return forkJoin({
      labels: this.getLabelTranslationsForHost(),
      data: this.getPaidStatisticsForHost(this.selectedYear),
    }).pipe(
      map((res) => {
        return {
          labels: res.labels.monthLabels,
          datasets: [
            {
              label: res.labels.creditorPercentageChartLabel,
              data: res.data.creditorData.getPercentages(),
              borderColor: DIAGRAMM_COLORS.CREDITOR_PERCENTAGES,
              fill: false,
              tension: 0,
              yAxisID: 'y1',
              type: 'line',
            },
            {
              label: res.labels.creditorVolumeChartLabel,
              data: res.data.creditorData.getTotalValues(),
              backgroundColor: DIAGRAMM_COLORS.CREDITOR_VALUES,
              yAxisID: 'y',
              type: 'bar',
              barThickness: 10,
            },
            {
              label: res.labels.debtorPercentageChartLabel,
              data: res.data.debtorData.getPercentages(),
              borderColor: DIAGRAMM_COLORS.DEPTOR_PERCENTAGES,
              fill: false,
              tension: 0,
              yAxisID: 'y1',
              type: 'line',
            },
            {
              label: res.labels.debtorVolumeChartLabel,
              data: res.data.debtorData.getTotalValues(),
              backgroundColor: DIAGRAMM_COLORS.DEPTOR_VALUES,
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
