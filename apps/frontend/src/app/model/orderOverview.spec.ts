import { OrderOverviewMock } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { DateFormatService } from '../shared/formats/date-format.service';
import { OrderOverview } from './orderOverview';

describe('OrderOverview', () => {
  let dateFormatServiceMock: Partial<DateFormatService>;
  let translateServiceMock: Partial<TranslateService>;

  beforeEach(() => {
    dateFormatServiceMock = {
      transformDateToCurrentLanguageFormat: jest.fn(),
    };

    translateServiceMock = {
      instant: jest.fn(),
    };
  });

  it('should convert OrderOverviewDto to OrderOverview correctly', () => {
    (dateFormatServiceMock.transformDateToCurrentLanguageFormat as jest.Mock).mockReturnValue('13.01.2023');
    (translateServiceMock.instant as jest.Mock).mockReturnValue('CalendarWeek');
    const result = OrderOverview.convertToOrderOverview(
      [OrderOverviewMock[0]],
      dateFormatServiceMock as DateFormatService,
      translateServiceMock as TranslateService
    );
    expect(result).toEqual([
      {
        amount: 2,
        calendarWeek: undefined,
        creationDate: '13.01.2023',
        customerId: 'pt0001',
        id: 'o001',
        price: '7.00€',
        product: 'Quadrocopter',
        robots: ['rt001', 'rt002'],
        status: 'Open',
        statusTimestamp: undefined,
        year: undefined,
      },
    ]);
  });
});
