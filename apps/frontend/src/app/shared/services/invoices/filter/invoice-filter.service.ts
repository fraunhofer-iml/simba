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

  cleanupFilter(filter: InvoiceFilter): InvoiceFilter {
    return Object.fromEntries(
      Object.entries(filter).filter(
        ([_, value]) =>
          value !== undefined &&
          value !== null &&
          value !== '' &&
          (!Array.isArray(value) || value.length > 0)
      )
    );
  }
}
