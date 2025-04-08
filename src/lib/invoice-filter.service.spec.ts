import { TestBed } from '@angular/core/testing';

import { InvoiceFilterService } from './invoice-filter.service';

describe('InvoiceFilterService', () => {
  let service: InvoiceFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
