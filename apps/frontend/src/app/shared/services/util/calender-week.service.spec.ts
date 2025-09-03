/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { addWeeks, startOfWeek } from 'date-fns';
import { TestBed } from '@angular/core/testing';
import { CalendarWeekService } from './calendar-week.service';


describe('CalendarWeekService', () => {
  let service: CalendarWeekService;

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2024-12-10T09:00:00Z'));
    TestBed.configureTestingModule({ imports: [], providers: [CalendarWeekService] });

    service = TestBed.inject(CalendarWeekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return remaining weeks for the current year', () => {
    const selectedYear = 2024;
    const expectedWeeks = [ 51, 52];
    const result = service.getCalendarWeeks(selectedYear);

    expect(result).toEqual(expectedWeeks);
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
