import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TradeReceivableService } from './trade-receivable.service';

describe('TradeReceivableService', () => {
  let service: TradeReceivableService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TradeReceivableService, provideHttpClient(), provideHttpClientTesting()] });

    service = TestBed.inject(TradeReceivableService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
