import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { LANGUAGEFORMATS } from './formats';

@Injectable()
export class DateFormatService {
  constructor(
    private readonly datePipe: DatePipe,
    private readonly translateService: TranslateService
  ) {}

  transformDateToCurrentLanguageFormat(date: string) {
    return this.datePipe.transform(date, this.translateService.currentLang === 'en' ? LANGUAGEFORMATS.EN : LANGUAGEFORMATS.DE) || '';
  }
}
