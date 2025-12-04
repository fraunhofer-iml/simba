/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScheduleDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { addHours, getISOWeek, setMinutes } from 'date-fns';
import {
  CustomSeriesOption,
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  CustomSeriesRenderItemReturn,
  EChartsOption,
} from 'echarts';
import { XAXisOption } from 'echarts/types/dist/shared';
import { FormatService } from '../../../shared/services/util/format.service';
import { SchedulingViewEnum } from '../enum/scheduling-view.enum';
import { SchedulingChartAxisBuilder } from './scheduling-chart-axis-builder';

export class SchedulingChartBuilder {
  static buildGanttChart(
    scheduling: ScheduleDto[],
    translateService: TranslateService,
    formatService: FormatService,
    view?: string,
    startDate?: Date
  ): EChartsOption {
    const yAxisData = [...scheduling].reverse().map((scheduling) => ({
      value: scheduling.buyerOrderRefDocumentId,
      product: scheduling.productName,
      amount: scheduling.amount,
      count: scheduling.machineAssignments.length,
    }));

    const barHeight = 40;
    const gap = 20;
    const xOffset = 5;
    const barColor = getComputedStyle(document.documentElement).getPropertyValue('--dark-blue-color');

    const seriesData: { name: string; value: (string | number)[] }[] = [];
    scheduling.forEach((scheduling: ScheduleDto, orderIndex: number) => {
      scheduling.machineAssignments.forEach((scheduleMachineAssignment, machineIndex) => {
        seriesData.push({
          name: `${scheduleMachineAssignment.machineId}`,
          value: [
            orderIndex,
            scheduleMachineAssignment.start,
            scheduleMachineAssignment.end,
            scheduling.price,
            scheduleMachineAssignment.machineId,
            machineIndex,
          ],
        });
      });
    });

    const xAxis = this.buildXAxis(scheduling, formatService, view, startDate);
    const customSeries: CustomSeriesOption = {
      type: 'custom',
      renderItem: (params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI): CustomSeriesRenderItemReturn =>
        SchedulingChartBuilder.renderSchedulingItem(params, api, view, barHeight, gap, xOffset, barColor),
      encode: { x: [1, 2], y: 0 },
      data: seriesData,
    };

    const rowsPerOrder = scheduling.reduce((acc, scheduling) => Math.max(acc, scheduling.machineAssignments.length), 1);
    const rowHeight = rowsPerOrder * (barHeight + gap);

    return {
      tooltip: {
        formatter: (params: any) => {
          const lines: string[] = [
            params.name ? `<b>${params.name}</b>` : '',
            `${translateService.instant('Production.Start')}: ${formatService.transformDateTimeToCurrentLanguageFormat(params.value[1])}`,
            `${translateService.instant('Production.End')}: ${formatService.transformDateTimeToCurrentLanguageFormat(params.value[2])}`,
            `${translateService.instant('Production.Price')}: ${formatService.transformNumberToCurrentLanguageFormat(params.value[3])}`,
          ].filter((line) => line !== '');

          return lines.join('<br/>');
        },
      },
      xAxis: [xAxis],
      yAxis: {
        type: 'category',
        position: 'left',
        data: yAxisData.map((data) => data.value),
        axisLabel: {
          margin: rowHeight / 2,
          formatter: (value: string, index: number) => {
            const order = yAxisData[index];
            return `{bold|${order.value}}\n${translateService.instant('Production.Product')}: ${order.product}\n${translateService.instant('Production.Amount')}: ${order.amount}`;
          },
          rich: {
            bold: { fontWeight: 'bold' },
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: 'solid',
          },
        },
      },
      series: [customSeries],
      grid: {
        containLabel: true,
        left: '10%',
        right: '5%',
        top: 50,
        bottom: 50,
        height: yAxisData.length * rowHeight,
      },
      graphic: [
        {
          type: 'text',
          left: '13%',
          top: '12.5%',
          style: {
            text: translateService.instant('Orders.Title'),
            font: 'bold 12px sans-serif',
          },
        } as echarts.GraphicComponentOption,
      ],
    };
  }

  static buildViewTitle(
    scheduling: ScheduleDto[],
    translateService: TranslateService,
    formatService: FormatService,
    view?: string,
    startDate?: Date
  ): string {
    const start = startDate ?? this.getEarliestStartDate(scheduling);
    const localeFormatter = formatService.getCurrentLocaleFormatter();
    let title: string;

    if (view === SchedulingViewEnum.WEEK) {
      const week = getISOWeek(start);
      title = `${translateService.instant('Production.CalenderWeek')} ${week}`;
    } else if (view === SchedulingViewEnum.DAY) {
      title = start.toLocaleDateString(localeFormatter, {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } else {
      const hourStart = setMinutes(start, 0);
      const hourEnd = addHours(hourStart, 4);
      const startTime = hourStart.toLocaleTimeString(localeFormatter, {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      });
      const endTime = hourEnd.toLocaleTimeString(localeFormatter, {
        hour: '2-digit',
        minute: '2-digit',
      });

      title = `${startTime} – ${endTime}`;
    }

    return title;
  }

  private static buildXAxis(scheduling: ScheduleDto[], formatService: FormatService, view?: string, startDate?: Date): XAXisOption {
    const start = startDate ?? this.getEarliestStartDate(scheduling);
    let option: XAXisOption;

    if (view === SchedulingViewEnum.WEEK) {
      option = SchedulingChartAxisBuilder.buildWeekXAxis(start, formatService);
    } else if (view === SchedulingViewEnum.DAY) {
      option = SchedulingChartAxisBuilder.buildDayXAxis(start);
    } else {
      option = SchedulingChartAxisBuilder.buildHourXAxis(start, formatService);
    }

    return option;
  }

  private static renderSchedulingItem(
    params: CustomSeriesRenderItemParams,
    api: CustomSeriesRenderItemAPI,
    view: SchedulingViewEnum | string | undefined,
    barHeight: number,
    gap: number,
    xOffset: number,
    barColor: string
  ): CustomSeriesRenderItemReturn {
    const orderIndex = api.value(0) as number;
    const startTime = api.value(1) as number;
    const endTime = api.value(2) as number;
    const machineId = api.value(4) as string;
    const machineIdx = api.value(5) as number;

    const start = api.coord([startTime, orderIndex]);
    const end = api.coord([endTime, orderIndex]);
    const offset = machineIdx * (barHeight + gap);
    const isActive = Date.now() >= startTime && Date.now() <= endTime;
    const fillColor = isActive ? getComputedStyle(document.documentElement).getPropertyValue('--frosted-orange') : barColor;

    const children: CustomSeriesRenderItemReturn[] = [
      {
        type: 'rect',
        shape: {
          x: start[0] + xOffset,
          y: start[1] - barHeight / 2 + offset,
          width: end[0] - start[0],
          height: barHeight,
        },
        style: { fill: fillColor },
      },
    ];

    if (view === SchedulingViewEnum.HOUR) {
      children.push({
        type: 'text',
        style: {
          text: machineId,
          x: start[0] + (end[0] - start[0]) / 2 + xOffset,
          y: start[1] + offset,
          align: 'center',
          verticalAlign: 'middle',
          fill: getComputedStyle(document.documentElement).getPropertyValue('--greyisch'),
          fontSize: 12,
        },
      });
    }

    return {
      type: 'group',
      children,
    } as CustomSeriesRenderItemReturn;
  }

  private static getEarliestStartDate(scheduling: ScheduleDto[]): Date {
    const startDates: Date[] = scheduling
      .flatMap((schedule) => schedule.machineAssignments.map((ma) => new Date(ma.start)))
      .filter((date) => !isNaN(date.getTime()));

    if (startDates.length === 0) {
      return new Date();
    }

    return startDates.reduce((earliest, current) => (earliest < current ? earliest : current), startDates[0]);
  }
}
