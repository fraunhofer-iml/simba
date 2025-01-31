import { InvoiceMocks } from '@ap3/api';
import { DateFormatService } from '../shared/services/util/date-format.service';
import { Invoice } from './invoice';
import { TranslateService } from '@ngx-translate/core';

describe('Invoice', () => {
  let dateFormatServiceMock: Partial<DateFormatService>;
  let translateServiceMock: Partial<TranslateService>;

  beforeEach(() => {
    dateFormatServiceMock = {
      transformDateToCurrentLanguageFormat: jest.fn(),
    };
    translateServiceMock = {
      instant: jest.fn(),
      stream: jest.fn(),
    };
    (translateServiceMock.stream as jest.Mock).mockImplementation((key: string) => ({
      subscribe: (callback: (translation: string) => void) => {
        if (key === 'PaymentStatus.Paid') callback('Paid');
      },
    }));
  });

  it('should handle empty InvoiceDto', () => {
    const result = Invoice.convertToInvoice([], dateFormatServiceMock as DateFormatService, translateServiceMock as TranslateService);
    expect(result).toEqual([]);
  });

  it('should call transformDateToCurrentLanguageFormat for each InvoiceDto', () => {
    Invoice.convertToInvoice(InvoiceMocks, dateFormatServiceMock as DateFormatService, translateServiceMock as TranslateService);
    expect(dateFormatServiceMock.transformDateToCurrentLanguageFormat).toHaveBeenCalledTimes(InvoiceMocks.length);
  });

  it('should format totalAmountWithoutVat to two decimal places with currency symbol', () => {
    const result = Invoice.convertToInvoice(InvoiceMocks, dateFormatServiceMock as DateFormatService, translateServiceMock as TranslateService);
    expect(result[0].totalAmountWithoutVat).toBe('3.00');
  });
});
