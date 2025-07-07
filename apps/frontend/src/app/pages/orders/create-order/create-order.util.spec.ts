import { TranslateService } from '@ngx-translate/core';
import { CreateOrderUtils } from './create-order.util';

const mockTranslate = {
  instant: jest.fn((key: string) => `translated:${key}`),
} as unknown as TranslateService;

describe('CreateOrderUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate correct week labels with translation', () => {
    const labels = CreateOrderUtils.buildChartLabels(mockTranslate, 3);
    expect(labels).toEqual(['translated:CalendarWeek 3', 'translated:CalendarWeek 4', 'translated:CalendarWeek 5', 'translated:CalendarWeek 6']);
    expect(mockTranslate.instant).toHaveBeenCalledWith('CalendarWeek');
  });

  it('should build correct chart data from stats', () => {
    const stats = {
      basePrice: [10, 20, 30],
      utilization: [1, 2, 3],
      timeUntilOrderBegins: [5, 6, 7],
    };

    const result = CreateOrderUtils.buildChartData(mockTranslate, stats as any);

    expect(result.length).toBe(3);
    expect(result[0].data).toEqual([10, 20, 30]);
    expect(result[0].label).toBe('translated:Offers.BasePrice');
    expect(result[1].label).toBe('translated:Offers.Utilization');
    expect(result[2].label).toBe('translated:Offers.TimeUntilOrderBegins');
  });
});
