import { InvoiceFilterService } from './invoice-filter.service';
import { BehaviorSubject } from 'rxjs';
import { invoiceFilterMock } from '../../../mocks/invoiceFilterMock';

describe('InvoiceFilterService', () => {
  let service: InvoiceFilterService;

  beforeEach(() => {
    service = new InvoiceFilterService();
  });

  it('should initialize with empty filter and BehaviorSubject', () => {
    expect(service.getFilter()).toEqual({});
    expect(service.getSubject()).toBeInstanceOf(BehaviorSubject);
    expect(service.getSubject().value).toBe(false);
  });

  it('should set a new filter', () => {
    service.setFilter(invoiceFilterMock);
    expect(service.getFilter()).toEqual(invoiceFilterMock);
    expect(service.getSubject().value).toBe(true);
  });

  it('should retain valid filter fields after cleanup', () => {
    const cleaned = service.cleanupFilter(invoiceFilterMock);

    expect(cleaned).toEqual({
      creditorId: '675',
      debtorId: "123",
      paymentStates: ['FINANCED']
    });
  });
});
