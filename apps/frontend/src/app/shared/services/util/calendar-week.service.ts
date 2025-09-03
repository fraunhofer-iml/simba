/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {addWeeks, getISOWeeksInYear, getWeek, getYear, startOfWeek} from 'date-fns';
import { Injectable } from '@angular/core';

@Injectable()
export class CalendarWeekService {
  public getLastCalendarWeek(year: number): number {
    return getISOWeeksInYear(new Date(year,0,4));
  }

  public getCalendarWeeks(selectedYear: number): number[] {
    const lastCalendarWeek = this.getLastCalendarWeek(selectedYear);
    if (selectedYear === getYear(new Date())) {
      const currentWeek = getWeek(new Date());
      return Array.from({ length: lastCalendarWeek - currentWeek }, (_, index) => currentWeek + index+1);
    } else {
      return Array.from({ length: lastCalendarWeek }, (_, index) => index + 1);
    }
  }

  public getTimestampFromCalendarWeek(year: number, calendarWeek: number): Date {
    const firstDayOfYear = new Date(year, 0, 1);

    // Adjust to the first Monday (start of the ISO week)
    const firstMonday = startOfWeek(firstDayOfYear, { weekStartsOn: 1 });
    return addWeeks(firstMonday, calendarWeek - 1);
  }

  public getCalendarWeekFromTimestamp(timestamp: Date): number {
    return getWeek(timestamp);
  }
}
