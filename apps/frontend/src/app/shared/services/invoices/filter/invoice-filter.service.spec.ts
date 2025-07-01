import { BehaviorSubject } from 'rxjs';
import { InvoiceFilter } from '../../../../model/invoice-filter';
import { invoiceFilterMock } from '../../../mocks/invoiceFilterMock';
import { FilterService } from '../../filter/filter.service';

describe('InvoiceFilterService', () => {
  let service: FilterService<InvoiceFilter>;

  beforeEach(() => {
    service = new FilterService<InvoiceFilter>();
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
    service.filter = invoiceFilterMock;

    service.cleanupFilter();
    const cleaned = service.getFilter();

    expect(cleaned).toEqual({
      creditorId: '675',
      debtorId: '123',
      paymentStates: ['FINANCED'],
    });
  });
});
