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

  it('should build correct chart data from offers', () => {
    const offers = [
      { basicPrice: 10, utilization: 10, timeUntilProduction: 50 },
      { basicPrice: 20, utilization: 20, timeUntilProduction: 60 },
      { basicPrice: 30, utilization: 30, timeUntilProduction: 70 },
    ];

    const result = CreateOrderUtils.buildChartData(mockTranslate, offers as any);

    expect(result.length).toBe(3);
    expect(result[0].data).toEqual([10, 20, 30]);
    expect(result[0].label).toBe('translated:Offers.BasicPrice');
    expect(result[1].data).toEqual([10, 20, 30]);
    expect(result[1].label).toBe('translated:Offers.Utilization');
    expect(result[2].data).toEqual([50, 60, 70]);
    expect(result[2].label).toBe('translated:Offers.TimeUntilProduction');
  });
});
