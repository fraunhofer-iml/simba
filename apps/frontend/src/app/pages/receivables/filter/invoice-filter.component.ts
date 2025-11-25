import { CompanyDto } from '@ap3/api';
import { PaymentStates } from '@ap3/util';
import {Component, EventEmitter, output} from '@angular/core';
import { InvoiceFilter } from '../../../model/invoice-filter';
import { AutocompleteCompanyFilterConfig } from '../../../shared/components/filter/autocomplete-company-filter/autocomplete-company-filter-config';
import { CheckBoxFilterConfig } from '../../../shared/components/filter/checkbox-filter/checkbox-filter-config';
import { DateRangeFilterConfig } from '../../../shared/components/filter/date-range-filter/date-range-filter-config';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FilterService } from '../../../shared/services/filter/filter.service';
import {
  creditorAutocompleteFilterConfig,
  dateRangeFilterConfig,
  debtorAutocompleteFilterConfig,
  paymentStatesCheckboxFilterConfig,
} from './invoice-filter-util';

@Component({
  selector: 'app-invoice-filter',
  templateUrl: './invoice-filter.component.html',
})
export class InvoiceFilterComponent {
  outPutFilter = output<InvoiceFilter>();

  resetEventEmitter: EventEmitter<string> = new EventEmitter();

  debtorId?: string;
  creditorId?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  paymentStates?: string[];
  possibleStates: string[] = Object.values(PaymentStates);

  debtorAutocompleteFilterConfig: AutocompleteCompanyFilterConfig = debtorAutocompleteFilterConfig;
  creditorAutocompleteFilterConfig: AutocompleteCompanyFilterConfig = creditorAutocompleteFilterConfig;
  dateRangeFilterConfig: DateRangeFilterConfig = dateRangeFilterConfig;
  paymentStatesCheckboxFilterConfig: CheckBoxFilterConfig = paymentStatesCheckboxFilterConfig;

  constructor(
    private readonly filterService: FilterService<InvoiceFilter>,
    readonly authService: AuthService
  ) {}

  reset() {
    this.resetEventEmitter.emit('reset');
  }

  save() {
    let filter: InvoiceFilter = new InvoiceFilter(this.debtorId, this.creditorId, this.dueDateFrom, this.dueDateTo, this.paymentStates);
    this.filterService.setFilter(filter);
    filter = this.filterService.getFilter();
    this.outPutFilter.emit(filter);
  }

  listenToDebtorFilter(company: CompanyDto | undefined) {
    if (company) {
      this.debtorId = company.id;
    } else {
      this.debtorId = '';
    }
  }
  listenToCreditorFilter(company: CompanyDto | undefined) {
    if (company) {
      this.creditorId = company.id;
    } else {
      this.creditorId = '';
    }
  }
  listenToDueDateFromFilter(date: Date | undefined) {
    this.dueDateFrom = date;
  }
  listenToDueDateToFilter(date: Date | undefined) {
    this.dueDateTo = date;
  }
  listenToPaymentstatesFilter(states: string[] | undefined) {
    this.paymentStates = states;
  }
}
