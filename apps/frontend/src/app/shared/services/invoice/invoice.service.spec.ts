import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [InvoiceService] });

    service = TestBed.inject(InvoiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
