import { InvoiceMocks } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { DateFormatService } from '../shared/services/util/date-format.service';
import { Invoice } from './invoice';

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
    const result = Invoice.convertToInvoice([]);
    expect(result).toEqual([]);
  });

  it('should format totalAmountWithoutVat to two decimal places with currency symbol', () => {
    const result = Invoice.convertToInvoice(InvoiceMocks);
    expect(result[0].totalAmountWithoutVat).toBe('3.00');
  });
});
