import { TestBed } from '@angular/core/testing';
import { OrderFilter } from '../../../model/order-filter';
import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService<OrderFilter>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FilterService<OrderFilter>] });
    service = TestBed.inject(FilterService<OrderFilter>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
