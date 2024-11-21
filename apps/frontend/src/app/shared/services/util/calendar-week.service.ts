import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable()
export class CalendarWeekService {
  constructor() {}

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
}
