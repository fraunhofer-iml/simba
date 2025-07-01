import { AutocompleteCompanyFilterConfig } from '../../../shared/components/filter/autocomplete-company-filter/autocomplete-company-filter-config';
import { CheckBoxFilterConfig } from '../../../shared/components/filter/checkbox-filter/checkbox-filter-config';
import { DateRangeFilterConfig } from '../../../shared/components/filter/date-range-filter/date-range-filter-config';

export const debtorAutocompleteFilterConfig: AutocompleteCompanyFilterConfig = new AutocompleteCompanyFilterConfig(
  'Filter.Payer',
  'Filter.ExampleCompany'
);

export const creditorAutocompleteFilterConfig: AutocompleteCompanyFilterConfig = new AutocompleteCompanyFilterConfig(
  'Filter.Payee',
  'Filter.ExampleCompany'
);

export const dateRangeFilterConfig: DateRangeFilterConfig = new DateRangeFilterConfig(
  'Filter.Date',
  'Filter.ExampleStartDate',
  'Filter.ExampleEndDate'
);

export const paymentStatesCheckboxFilterConfig: CheckBoxFilterConfig = new CheckBoxFilterConfig('Filter.FinancialStatus', 'PaymentStatus.');
