import { PaidStatisticsUtil } from './paid-statistics.util';

describe('PaidStatisticsUtil', () => {
  it('should generate 11 selectable years including current year', () => {
    const currentYear = new Date().getFullYear();
    const years = PaidStatisticsUtil.generateSelectableYears();
    expect(years.length).toBe(11);
    expect(years[0]).toBe(currentYear);
    expect(years[10]).toBe(currentYear - 10);
  });

  it('should build dataset with correct structure', () => {
    const months = ['Jan', 'Feb', 'Mar'];
    const dataset = PaidStatisticsUtil.buildDataset(months, 'y', 'y1');

    expect(dataset.labels).toEqual(months);
    expect(dataset.datasets.length).toBe(4);
    expect(dataset.datasets[0].type).toBe('line');
    expect(dataset.datasets[1].type).toBe('bar');
    expect(dataset.datasets[2].type).toBe('line');
    expect(dataset.datasets[3].type).toBe('bar');
    expect(dataset.datasets.every((ds) => ds.data.length === 0)).toBe(true);
  });
});
