/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { LANGUAGEFORMATS } from '../../formats/date-formats';

@Injectable()
export class FormatService {
  constructor(
    private readonly datePipe: DatePipe,
    private readonly translateService: TranslateService
  ) {}

  transformDateToCurrentLanguageFormat(date: string) {
    return this.datePipe.transform(date, this.getDateFormatByCurrentLang()) || '';
  }

  transformDateTimeToCurrentLanguageFormat(date: string): string {
    return this.datePipe.transform(date, this.getDateTimeFormatByCurrentLang()) ?? '';
  }

  getDateFormatByCurrentLang() {
    return this.translateService.currentLang === 'en' ? LANGUAGEFORMATS.EN : LANGUAGEFORMATS.DE;
  }

  getDateTimeFormatByCurrentLang() {
    return this.translateService.currentLang === 'en' ? LANGUAGEFORMATS.EN_DATETIME : LANGUAGEFORMATS.DE_DATETIME;
  }

  getTimeFormat() {
    return 'HH:mm';
  }

  transformNumberToCurrentLanguageFormat(number: string | number): string {
    const formatter = new Intl.NumberFormat(this.translateService.currentLang === 'en' ? 'en-US' : 'de-DE', { minimumFractionDigits: 2 });
    return formatter.format(Number(number));
  }

  getCurrentLocaleFormatter(): string {
    return this.translateService.currentLang === 'en' ? 'en-US' : 'de-DE';
  }
}
