/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { CalendarWeekService } from './calendar-week.service';
import moment from 'moment';

jest.mock('moment', () => {
  const mMoment = {
    year: jest.fn(),
    isoWeek: jest.fn(),
  };
  return jest.fn(() => mMoment);
});

describe('CalendarWeekService', () => {
  let service: CalendarWeekService;
  let mockMoment: any;

  beforeEach(() => {
    mockMoment = moment();
    TestBed.configureTestingModule({ imports: [], providers: [CalendarWeekService] });

    service = TestBed.inject(CalendarWeekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return remaining weeks for the current year', () => {
    mockMoment.year.mockReturnValue(2024);
    mockMoment.isoWeek.mockReturnValue(50);
    const selectedYear = 2024;
    const lastCalendarWeek = 52;
    const expectedWeeks = [50, 51, 52];
    const result = service.getCalendarWeeks(selectedYear, lastCalendarWeek);

    expect(result).toEqual(expectedWeeks);
  });
});
