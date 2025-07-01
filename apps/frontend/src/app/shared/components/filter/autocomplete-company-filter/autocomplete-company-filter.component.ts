/*!
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { CompanyDto } from '@ap3/api';
import { UserRoles } from '@ap3/util';
import { map, Observable, of } from 'rxjs';
import { Component, EventEmitter, input, InputSignal, OnInit, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { CompaniesService } from '../../../services/companies/companies.service';
import { AutocompleteCompanyFilterConfig } from './autocomplete-company-filter-config';

@Component({
  selector: 'app-autocomplete-company-filter',
  templateUrl: './autocomplete-company-filter.component.html',
  styleUrl: './autocomplete-company-filter.component.scss',
})
export class AutocompleteCompanyFilterComponent implements OnInit {
  filteredCompanies: Observable<CompanyDto[]> = of();
  company: FormControl<CompanyDto | null> = new FormControl<CompanyDto | null>(null);
  resetEventEmitter: InputSignal<EventEmitter<string> | undefined> = input<EventEmitter<string>>();
  inputConfig: InputSignal<AutocompleteCompanyFilterConfig> = input<AutocompleteCompanyFilterConfig>(
    new AutocompleteCompanyFilterConfig('', '')
  );
  selectedCompany = output<CompanyDto | undefined>();
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.company.valueChanges.subscribe((company: CompanyDto | null) => {
      this.sendSelectedCompany();
    });

    this.resetEventEmitter()?.subscribe((string) => {
      this.company.reset();
    });

    this.filteredCompanies = this.companiesService.getAllAvailableCompanies().pipe(
      map((res: CompanyDto[]) => {
        if (this.authService.getCurrentlyLoggedInUserRole() !== UserRoles.ADMIN) {
          const userCompanyId = this.authService.getCurrentlyLoggedInCompanyId();
          res = res.filter((company: CompanyDto) => {
            return company.id !== userCompanyId;
          });
        }
        return res;
      })
    );
  }

  displayCompany(company: CompanyDto): string {
    return company ? company.name : '';
  }

  sendSelectedCompany() {
    if (this.company.value) {
      this.selectedCompany.emit(this.company.value);
    } else {
      this.selectedCompany.emit(undefined);
    }
  }
}
