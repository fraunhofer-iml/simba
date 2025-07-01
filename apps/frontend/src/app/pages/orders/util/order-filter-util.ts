import moment from 'moment';
import { OrderFilter } from '../../../model/order-filter';
import { AutocompleteCompanyFilterConfig } from '../../../shared/components/filter/autocomplete-company-filter/autocomplete-company-filter-config';
import { CheckBoxFilterConfig } from '../../../shared/components/filter/checkbox-filter/checkbox-filter-config';
import { DateRangeFilterConfig } from '../../../shared/components/filter/date-range-filter/date-range-filter-config';
import { FILTERDATEFORMAT } from '../../../shared/formats/date-formats';

export function convertToOrderFilter(filter: OrderFilter): OrderFilter {
  const orderFilter: OrderFilter = {};
  if (filter.companyId) {
    orderFilter['companyId'] = filter.companyId;
  }
  if (filter.customerName) {
    orderFilter['customerName'] = filter.customerName;
  }
  if (filter.productionDateFrom) {
    orderFilter['productionDateFrom'] = moment(filter.productionDateFrom).format(FILTERDATEFORMAT);
  }
  if (filter.productionDateTo) {
    orderFilter['productionDateTo'] = moment(filter.productionDateTo).format(FILTERDATEFORMAT);
  }
  if (filter.serviceStates) {
    orderFilter['serviceStates'] = filter.serviceStates;
  }
  return orderFilter;
}

export const companyAutocompleteFilterConfig: AutocompleteCompanyFilterConfig = new AutocompleteCompanyFilterConfig(
  'Filter.Orders.Company',
  'Filter.Orders.ExampleCompany'
);

export const customerAutocompleteFilterConfig: AutocompleteCompanyFilterConfig = new AutocompleteCompanyFilterConfig(
  'Filter.Orders.Customer',
  'Filter.Orders.ExampleCustomer'
);

export const ordersDateRangeFilterConfig: DateRangeFilterConfig = new DateRangeFilterConfig(
  'Filter.Orders.Date',
  'Filter.Orders.ExampleStartDate',
  'Filter.Orders.ExampleEndDate'
);

export const serviceStatesCheckboxFilterConfig: CheckBoxFilterConfig = new CheckBoxFilterConfig(
  'Filter.Orders.ServiceStatus',
  'Orders.Status.'
);
