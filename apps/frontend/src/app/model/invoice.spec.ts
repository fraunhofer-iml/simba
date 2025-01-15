import { InvoiceMocks } from '@ap3/api';
import { Invoice } from './invoice';
import { DateFormatService } from '../shared/formats/date-format.service';

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
