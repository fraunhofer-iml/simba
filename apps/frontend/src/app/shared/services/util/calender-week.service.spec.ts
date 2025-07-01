/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { addWeeks, startOfWeek } from 'date-fns';
import moment from 'moment';
import { TestBed } from '@angular/core/testing';
import { CalendarWeekService } from './calendar-week.service';

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

  it('should return full weeks list for past year', () => {
    const result = service.getCalendarWeeks(2020, 52);
    expect(result.length).toBe(52);
    expect(result[0]).toBe(1);
    expect(result[51]).toBe(52);
  });

  it('should return correct timestamp for first calendar week', () => {
    const result = service.getTimestampFromCalendarWeek(2023, 1);
    const expected = addWeeks(startOfWeek(new Date(2023, 0, 1), { weekStartsOn: 1 }), 0);
    expect(result.toDateString()).toBe(expected.toDateString());
  });

  it('should return correct timestamp for week 10 of 2025', () => {
    const result = service.getTimestampFromCalendarWeek(2025, 10);
    const expected = addWeeks(startOfWeek(new Date(2025, 0, 1), { weekStartsOn: 1 }), 9);
    expect(result.toDateString()).toBe(expected.toDateString());
  });
});
