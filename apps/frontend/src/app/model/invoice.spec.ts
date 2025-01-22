import { InvoiceMocks } from '@ap3/api';
import { DateFormatService } from '../shared/services/util/date-format.service';
import { Invoice } from './invoice';

describe('Invoice', () => {
  let dateFormatServiceMock: Partial<DateFormatService>;

  beforeEach(() => {
    dateFormatServiceMock = {
      transformDateToCurrentLanguageFormat: jest.fn(),
    };
  });

  it('should handle empty InvoiceDto', () => {
    const result = Invoice.convertToInvoice([], dateFormatServiceMock as DateFormatService);
    expect(result).toEqual([]);
  });

  it('should call transformDateToCurrentLanguageFormat for each InvoiceDto', () => {
    Invoice.convertToInvoice(InvoiceMocks, dateFormatServiceMock as DateFormatService);
    expect(dateFormatServiceMock.transformDateToCurrentLanguageFormat).toHaveBeenCalledTimes(InvoiceMocks.length);
  });

  it('should format totalAmountWithoutVat to two decimal places with currency symbol', () => {
    const result = Invoice.convertToInvoice(InvoiceMocks, dateFormatServiceMock as DateFormatService);
    expect(result[0].totalAmountWithoutVat).toBe('3.00€');
  });
});
