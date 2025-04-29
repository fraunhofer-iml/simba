import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { InvoiceFilter } from '../../../../model/invoice-filter';

@Injectable()
export class InvoiceFilterService {
  filter: InvoiceFilter;
  filterBehaviorSubject: BehaviorSubject<boolean>;

  constructor() {
    this.filter = <InvoiceFilter>{};
    this.filterBehaviorSubject = new BehaviorSubject(false);
  }

  getFilter(): InvoiceFilter {
    return this.filter;
  }

  getSubject(): BehaviorSubject<boolean> {
    return this.filterBehaviorSubject;
  }

  setFilter(newFilter: InvoiceFilter): void {
    this.filter = newFilter;
    this.filterBehaviorSubject.next(true);
  }

  cleanupFilter() {
    if (this.filter) {
      if (this.filter.creditorId === '') {
        delete this.filter.creditorId;
      }
      if (this.filter.debtorId === '') {
        delete this.filter.debtorId;
      }
      if (!this.filter.dueDateFrom) {
        delete this.filter.dueDateFrom;
      }
      if (!this.filter.dueDateTo) {
        delete this.filter.dueDateTo;
      }
      if (this.filter.paymentStates?.length === 0) {
        delete this.filter.paymentStates;
      }
    }
  }
}
