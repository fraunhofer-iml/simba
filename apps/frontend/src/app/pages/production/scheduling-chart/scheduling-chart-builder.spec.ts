/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScheduleDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { FormatService } from '../../../shared/services/util/format.service';
import { SchedulingChartBuilder } from './scheduling-chart-builder';

describe('SchedulingChartBuilder', () => {
  let translateService: TranslateService;
  let formatService: FormatService;

  beforeEach(() => {
    translateService = {
      instant: jest.fn((key) => key)
    } as unknown as TranslateService;
    formatService = {
      transformNumberToCurrentLanguageFormat: jest.fn((n) => n.toString()),
      getCurrentLocaleFormatter: jest.fn(() => 'de-DE'),
    } as unknown as FormatService;
  });

  const mockScheduling: ScheduleDto[] = [
    new ScheduleDto(
      [
        {
          machineId: 'M1',
          start: '2025-09-16T08:00:00Z',
          end: '2025-09-16T10:00:00Z',
        },
      ],
      '1',
      'DOC-1',
      'Quadrokopter',
      1,
      10
    ),
  ];

  it('should return a valid chart option object', () => {
    const chart = SchedulingChartBuilder.buildGanttChart(mockScheduling, translateService, formatService, 'hour');
    expect(chart).toHaveProperty('xAxis');
    expect(chart).toHaveProperty('yAxis');
    expect(chart).toHaveProperty('series');
  });

  it('should return hour view title', () => {
    const title = SchedulingChartBuilder.buildViewTitle(mockScheduling, translateService, formatService, 'hour');
    expect(title).toMatch(/\d{2}:\d{2} – \d{2}:\d{2}/);
  });

  it('should return day view title', () => {
    const date = new Date('2025-09-16T00:00:00Z');
    const title = SchedulingChartBuilder.buildViewTitle(mockScheduling, translateService, formatService, 'day', date);
    expect(title).toContain('16.09.2025');
  });

  it('should return week view title', () => {
    const date = new Date('2025-09-16T00:00:00Z');
    const title = SchedulingChartBuilder.buildViewTitle(mockScheduling, translateService, formatService, 'week', date);
    expect(title).toContain('Production.CalenderWeek');
  });
});
