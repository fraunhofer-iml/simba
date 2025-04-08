import { Injectable } from '@angular/core';
import { InvoiceFilter } from '../../../../model/invoice-filter';

@Injectable()
export class InvoiceFilterService {
  filter: InvoiceFilter;

  constructor() {
    this.filter = <InvoiceFilter>{};
  }

  getFilter(): InvoiceFilter {
    return this.filter;
  }

  setFilter(newFilter: InvoiceFilter) {
    this.filter = newFilter;
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
