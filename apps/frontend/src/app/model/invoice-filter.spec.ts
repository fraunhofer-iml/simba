import { InvoiceFilter } from './invoice-filter';

describe('InvoiceFilter', () => {
  it('should create an instance with all parameters', () => {
    const debtor = 'SmartPay Solutions AG';
    const creditor = 'EcoTrade Solutions AG';
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-12-31');
    const states = ['OPEN', 'PAID'];

    const filter = new InvoiceFilter(debtor, creditor, startDate, endDate, states);

    expect(filter.debtorId).toBe(debtor);
    expect(filter.creditorId).toBe(creditor);
    expect(filter.dueDateFrom).toEqual(startDate);
    expect(filter.dueDateTo).toEqual(endDate);
    expect(filter.paymentStates).toEqual(states);
  });

  it('should create an instance with only payer and payee', () => {
    const filter = new InvoiceFilter('SmartPay Solutions AG', 'EcoTrade Solutions AG');

    expect(filter.debtorId).toBe('SmartPay Solutions AG');
    expect(filter.creditorId).toBe('EcoTrade Solutions AG');
    expect(filter.dueDateFrom).toBeUndefined();
    expect(filter.dueDateTo).toBeUndefined();
    expect(filter.paymentStates).toBeUndefined();
  });
});
