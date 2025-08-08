/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { addWeeks, startOfWeek } from 'date-fns';
import moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable()
export class CalendarWeekService {
  public getLastCalendarWeek(year: number): number {
    let numberOfWeeks = 52;
    const lastWeekDay = this.getLastWeekday(year);
    const firstWeekDay = this.getFirstWeekday(year);

    if (year % 4 === 0) {
      if ((firstWeekDay === 3 && lastWeekDay === 4) || (firstWeekDay === 4 && lastWeekDay === 5)) {
        numberOfWeeks = 53;
      }
    } else if (firstWeekDay === 4 && lastWeekDay === 4) {
      numberOfWeeks = 53;
    }
    return numberOfWeeks;
  }

  public getLastWeekday(year: number) {
    const lastDayOfYear: Date = new Date(year, 11, 31);
    return lastDayOfYear.getDay();
  }

  public getFirstWeekday(year: number) {
    const firstDayOfYear: Date = new Date(year, 0, 1);
    return firstDayOfYear.getDay();
  }

  public getCalendarWeeks(selectedYear: number, lastCalendarWeek: number): number[] {
    const currentYear = moment().year();
    if (selectedYear === currentYear) {
      const currentWeek = moment().isoWeek();
      return Array.from({ length: lastCalendarWeek - currentWeek + 1 }, (_, index) => currentWeek + index);
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
    const firstDayOfYear = new Date(new Date(timestamp).getFullYear(), 0, 1);
    // Adjust to the first Monday (start of the ISO week)
    const firstMonday = startOfWeek(firstDayOfYear, { weekStartsOn: 1 });
    // Determine time passed since start of year
    const timeDifferenceInMilliseconds = new Date(timestamp).getTime() - firstMonday.getTime();
    // Convert to calendar weeks
    const calendarWeeks = Math.ceil(timeDifferenceInMilliseconds / 604800000);
    return calendarWeeks;
  }
}
