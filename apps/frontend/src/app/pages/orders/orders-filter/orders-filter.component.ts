import { CompanyDto } from '@ap3/api';
import { ServiceStatesEnum } from '@ap3/util';
import {Component, EventEmitter, output } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { OrderFilter } from '../../../model/order-filter';
import { AutocompleteCompanyFilterConfig } from '../../../shared/components/filter/autocomplete-company-filter/autocomplete-company-filter-config';
import { CheckBoxFilterConfig } from '../../../shared/components/filter/checkbox-filter/checkbox-filter-config';
import { DateRangeFilterConfig } from '../../../shared/components/filter/date-range-filter/date-range-filter-config';
import { FULLDATE_FORMAT } from '../../../shared/formats/datepicker-format';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FilterService } from '../../../shared/services/filter/filter.service';
import {
  companyAutocompleteFilterConfig,
  customerAutocompleteFilterConfig,
  ordersDateRangeFilterConfig,
  serviceStatesCheckboxFilterConfig,
} from '../util/order-filter-util';

@Component({
  selector: 'app-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.scss',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: FULLDATE_FORMAT }],
})
export class OrdersFilterComponent {
  outPutFilter = output<OrderFilter>();

  resetEventEmitter: EventEmitter<string> = new EventEmitter();

  companyId?: string;
  customerName?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  serviceStates?: string[];
  possibleStates: string[] = [ServiceStatesEnum.PRODUCED, ServiceStatesEnum.PLANNED, ServiceStatesEnum.SCHEDULED];

  companyAutocompleteFilterConfig: AutocompleteCompanyFilterConfig = companyAutocompleteFilterConfig;
  customerAutocompleteFilterConfig: AutocompleteCompanyFilterConfig = customerAutocompleteFilterConfig;
  ordersDateRangeFilterConfig: DateRangeFilterConfig = ordersDateRangeFilterConfig;
  serviceStatesCheckboxFilterConfig: CheckBoxFilterConfig = serviceStatesCheckboxFilterConfig;

  constructor(
    private readonly filterService: FilterService<OrderFilter>,
    readonly authService: AuthService
  ) {}

  listenToCompanyFilter(company: CompanyDto | undefined) {
    if (company) {
      this.companyId = company.id;
    } else {
      this.companyId = '';
    }
  }
  listenToCustomerFilter(company: CompanyDto | undefined) {
    if (company) {
      this.customerName = company.name;
    } else {
      this.customerName = '';
    }
  }
  listenToDueDateFromFilter(date: Date | undefined) {
    this.dueDateFrom = date;
  }
  listenToDueDateToFilter(date: Date | undefined) {
    this.dueDateTo = date;
  }
  listenToServiceStatesFilter(states: string[] | undefined) {
    this.serviceStates = states;
  }

  reset() {
    this.resetEventEmitter.emit('reset');
  }

  save() {
    let filter: OrderFilter = new OrderFilter(
      this.companyId,
      this.customerName,
      this.dueDateFrom?.toISOString(),
      this.dueDateTo?.toISOString(),
      this.serviceStates
    );
    this.filterService.setFilter(filter);
    filter = this.filterService.getFilter();
    this.outPutFilter.emit(filter);
  }
}
