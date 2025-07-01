import { FormatService } from './format.service';
import { LANGUAGEFORMATS } from '../../formats/date-formats';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

describe('FormatService', () => {
  let service: FormatService;

  const datePipeMock = {
    transform: jest.fn(),
  } as unknown as DatePipe;

  const translateMock = {
    currentLang: 'de',
  } as TranslateService;

  beforeEach(() => {
    service = new FormatService(datePipeMock, translateMock);
  });

  it('should return correct date format for DE', () => {
    expect(service.getDateFormatByCurrentLang()).toBe(LANGUAGEFORMATS.DE);
  });

  it('should return correct datetime format for DE', () => {
    expect(service.getDateTimeFormatByCurrentLang()).toBe(LANGUAGEFORMATS.DE_DATETIME);
  });

  it('should return "HH:mm" for time format', () => {
    expect(service.getTimeFormat()).toBe('HH:mm');
  });

  it('should format string number correctly', () => {
    translateMock.currentLang = 'en';
    const result = service.transformNumberToCurrentLanguageFormat('1000.1');
    expect(result).toBe('1,000.10');
  });
});
