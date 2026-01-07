/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScheduleDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import type { EChartsOption } from 'echarts';
import { catchError, tap, throwError } from 'rxjs';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OrdersService } from '../../shared/services/orders/orders.service';
import { FormatService } from '../../shared/services/util/format.service';
import { SchedulingViewEnum } from './enum/scheduling-view.enum';
import { SchedulingChartBuilder } from './scheduling-chart/scheduling-chart-builder';
import { STREAM_URL } from '../../../environments/environment';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrl: './production.component.scss',
})
export class ProductionComponent {
  streamUrl: SafeResourceUrl;
  schedulingData: ScheduleDto[] = [];
  chartOptions: EChartsOption = {};
  currentView: SchedulingViewEnum = SchedulingViewEnum.WEEK;
  currentStartDate: Date = new Date();
  viewChartTitle: string | undefined;

  private readonly weekShift: number = 7;
  private readonly hourShift: number = 4;
  protected readonly maxShiftDays: number = 14;
  protected readonly viewShift: number = 1;
  protected readonly DateEnum = SchedulingViewEnum;
  protected readonly ScheduleViewEnum = SchedulingViewEnum;

  get canShiftBackward(): boolean {
    const earliestAllowedDate = new Date();
    earliestAllowedDate.setDate(earliestAllowedDate.getDate() - this.maxShiftDays);
    return this.currentStartDate > earliestAllowedDate;
  }

  get canShiftForward(): boolean {
    const latestAllowedDate = new Date();
    latestAllowedDate.setDate(latestAllowedDate.getDate() + this.maxShiftDays - 1);
    return this.currentStartDate < latestAllowedDate;
  }

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly cdr: ChangeDetectorRef,
    private readonly sanitizer: DomSanitizer,
    private readonly orderService: OrdersService,
    private readonly formatService: FormatService,
    private readonly translateService: TranslateService
  ) {
    this.streamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(STREAM_URL); // NOSONAR: URL is trusted and controlled
    this.getCurrentScheduling();
    this.translateService.onLangChange.subscribe(() => {
      this.updateChart();
    })
  }

  setView(view: SchedulingViewEnum) {
    this.currentView = view;
    this.updateChart();
  }

  shiftForward(viewShift: number) {
    this.shiftView(viewShift);
  }

  shiftBackward(viewShift: number) {
    this.shiftView(viewShift);
  }

  onChartClick(event: any) {
    const time = new Date(event.value[1]);

    if (this.currentView === this.DateEnum.WEEK) {
      const dayStart = new Date(time);
      dayStart.setHours(0, 0, 0, 0);
      this.changeView(this.DateEnum.DAY, dayStart);
    } else if (this.currentView === this.DateEnum.DAY) {
      const hourStart = new Date(time);
      hourStart.setMinutes(0, 0, 0);
      this.changeView(this.DateEnum.HOUR, hourStart);
    }
  }

  private changeView(targetView: SchedulingViewEnum, startDate: Date) {
    this.currentView = targetView;
    this.currentStartDate = startDate;
    this.updateChart();
  }

  private getCurrentScheduling() {
    this.orderService
      .getCurrentScheduling()
      .pipe(
        tap((scheduling: ScheduleDto[]) => {
          this.schedulingData = scheduling;
          this.updateChart();
        }),
        catchError((error) => {
          this.snackBar.open(
            this.translateService.instant('Error.GetCurrentSchedulingFailed'),
            this.translateService.instant('CloseSnackBarAction')
          );
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  private updateChart() {
    if (!this.schedulingData?.length) return;
    this.chartOptions = SchedulingChartBuilder.buildGanttChart(this.schedulingData, this.translateService, this.formatService, this.currentView, this.currentStartDate);
    this.viewChartTitle = SchedulingChartBuilder.buildViewTitle(this.schedulingData, this.translateService, this.formatService, this.currentView, this.currentStartDate);
    this.cdr.detectChanges();
  }

  private shiftView(direction: number) {
    const newDate = new Date(this.currentStartDate);

    // Indicates a shift direction: 1 = forward, -1 = backward
    const shifts: Record<string, (date: Date, direction: number) => void> = {
      week: (date, direction) => date.setDate(date.getDate() + this.weekShift * direction),
      day: (date, direction) => date.setDate(date.getDate() + direction),
      hour: (date, direction) => date.setHours(date.getHours() + this.hourShift * direction)
    };

    shifts[this.currentView]?.(newDate, direction);
    this.currentStartDate = newDate;
    this.updateChart();
  }
}
