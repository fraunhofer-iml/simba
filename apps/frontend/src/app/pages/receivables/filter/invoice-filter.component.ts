import { CompanyDto } from '@ap3/api';
import { PaymentStates, UserRoles } from '@ap3/util';
import { map, Observable, of, startWith } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InvoiceFilter } from '../../../model/invoice-filter';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CompaniesService } from '../../../shared/services/companies/companies.service';

@Component({
  selector: 'app-invoice-filter',
  templateUrl: './invoice-filter.component.html',
  styleUrl: './invoice-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceFilterComponent implements OnInit {
  availableCompanies: CompanyDto[] = [];
  paymentStates: string[] = Object.values(PaymentStates);
  filterFormGroup = new FormGroup({
    payer: new FormControl<CompanyDto | undefined>(undefined),
    payee: new FormControl<CompanyDto | undefined>(undefined),
    dateRange: new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    }),
    selectedFinancialStates: new FormControl<string[]>([]),
  });

  filteredPayerOptions: Observable<CompanyDto[]> = of([]);
  filteredPayeeOptions: Observable<CompanyDto[]> = of([]);
  @Input() filter: InvoiceFilter;
  @Output() outputFilter = new EventEmitter<InvoiceFilter>();

  constructor(
    private readonly companiesService: CompaniesService,
    readonly authService: AuthService
  ) {
    this.filter = {};
  }

  ngOnInit(): void {
    this.setAutocompletePipes();
    this.setFormGroupWithStaticFilterValues();
    this.companiesService.getAllAvailableCompanies().subscribe((res: CompanyDto[]) => {
      if (this.authService.getCurrentlyLoggedInUserRole() !== UserRoles.ADMIN) {
        const userCompanyId = this.authService.getCurrentlyLoggedInCompanyId();
        res = res.filter((company: CompanyDto) => {
          return company.id !== userCompanyId;
        });
      }
      this.availableCompanies = res;
      this.setFormGroupWithAsyncFilterValues();
    });
  }

  setAutocompletePipes() {
    this.filteredPayerOptions = this.filterFormGroup.controls['payer']?.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : '';
        return name ? this.filterCompanies(name) : this.availableCompanies.slice();
      })
    );
    this.filteredPayeeOptions = this.filterFormGroup.controls['payee']?.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : '';
        return name ? this.filterCompanies(name) : this.availableCompanies.slice();
      })
    );
  }

  setFormGroupWithStaticFilterValues() {
    if (this.filter.dueDateFrom) {
      this.filterFormGroup.controls['dateRange']?.controls['start'].setValue(this.filter.dueDateFrom);
    }
    if (this.filter.dueDateTo) {
      this.filterFormGroup.controls['dateRange']?.controls['end'].setValue(this.filter.dueDateTo);
    }
    if (this.filter.paymentStates) {
      this.filterFormGroup.controls['selectedFinancialStates']?.setValue(this.filter.paymentStates);
    }
  }

  setFormGroupWithAsyncFilterValues() {
    if (this.filter.creditorId) {
      this.filterFormGroup.controls['payee']?.setValue(
        this.availableCompanies.find((company) => {
          return company.id === this.filter.creditorId;
        })
      );
    }
    if (this.filter.debtorId) {
      this.filterFormGroup.controls['payer']?.setValue(
        this.availableCompanies.find((company) => {
          return company.id === this.filter.debtorId;
        })
      );
    }
  }

  setFilter() {
    if (this.filterFormGroup.controls['payer']?.value) {
      this.filter.debtorId = this.filterFormGroup.controls['payer']?.value.id;
    } else {
      this.filter.debtorId = '';
    }
    if (this.filterFormGroup.controls['payee']?.value) {
      this.filter.creditorId = this.filterFormGroup.controls['payee']?.value.id;
    } else {
      this.filter.creditorId = '';
    }
    if (this.filterFormGroup.controls['selectedFinancialStates']?.value) {
      this.filter.paymentStates = this.filterFormGroup.controls['selectedFinancialStates']?.value;
    } else {
      this.filter.paymentStates = [];
    }
    if (this.filterFormGroup.controls['dateRange']?.controls['start'].value) {
      this.filter.dueDateFrom = this.filterFormGroup.controls['dateRange']?.controls['start'].value;
    } else {
      this.filter.dueDateFrom = undefined;
    }
    if (this.filterFormGroup.controls['dateRange']?.controls['end'].value) {
      this.filter.dueDateTo = this.filterFormGroup.controls['dateRange']?.controls['end'].value;
    } else {
      this.filter.dueDateTo = undefined;
    }
  }

  displayCompanies(company: CompanyDto): string {
    return company ? company.name : '';
  }

  private filterCompanies(name: string): CompanyDto[] {
    const filterValue = name.toLowerCase();
    return this.availableCompanies.filter((company) => company.name.toLowerCase().includes(filterValue));
  }

  onCheckBoxChange(selectedState: string) {
    let states = this.filterFormGroup.controls['selectedFinancialStates'].value;
    if (states && !states.includes(selectedState)) {
      states.push(selectedState);
      this.filterFormGroup.controls['selectedFinancialStates'].setValue(states);
    } else if (states) {
      states = states.filter((state) => state !== selectedState);
      this.filterFormGroup.controls['selectedFinancialStates'].setValue(states);
    }
  }

  isCheckBoxChecked(value: string): boolean {
    return this.filterFormGroup.controls['selectedFinancialStates'].value
      ? this.filterFormGroup.controls['selectedFinancialStates'].value.includes(value)
      : false;
  }

  onSaveClick(): void {
    this.setFilter();
    this.outputFilter.emit(this.filter);
  }

  resetFormGroup() {
    this.filterFormGroup.reset();
  }
}
