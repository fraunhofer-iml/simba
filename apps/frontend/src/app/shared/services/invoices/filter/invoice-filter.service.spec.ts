import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { InvoiceFilterService } from './invoice-filter.service';

describe('InvoiceFilterService', () => {
  let service: InvoiceFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [InvoiceFilterService, provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(InvoiceFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
