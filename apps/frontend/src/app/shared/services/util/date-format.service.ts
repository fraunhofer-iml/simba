/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateService } from '@ngx-translate/core';
import { addWeeks, startOfWeek } from 'date-fns';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { LANGUAGEFORMATS } from '../../formats/date-formats';

@Injectable()
export class DateFormatService {
  constructor(
    private readonly datePipe: DatePipe,
    private readonly translateService: TranslateService
  ) {}

  transformDateToCurrentLanguageFormat(date: string) {
    return this.datePipe.transform(date, this.getDateFormatByCurrentLang()) || '';
  }

  getDateFormatByCurrentLang() {
    return this.translateService.currentLang === 'en' ? LANGUAGEFORMATS.EN : LANGUAGEFORMATS.DE;
  }

  getTimestampFromCalendarWeek(year: number, calendarWeek: number): Date {
    const firstDayOfYear = new Date(year, 0, 1);

    // Adjust to the first Monday (start of the ISO week)
    const firstMonday = startOfWeek(firstDayOfYear, { weekStartsOn: 1 });
    return addWeeks(firstMonday, calendarWeek - 1);
  }
}
