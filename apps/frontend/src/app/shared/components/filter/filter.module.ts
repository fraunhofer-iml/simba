/*!
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth/auth.service';
import { CompaniesService } from '../../services/companies/companies.service';
import { FilterService } from '../../services/filter/filter.service';
import { FinancialRoleService } from '../../services/util/financial-role.service';
import { FormatService } from '../../services/util/format.service';
import { AutocompleteCompanyFilterComponent } from './autocomplete-company-filter/autocomplete-company-filter.component';
import { CheckboxFilterComponent } from './checkbox-filter/checkbox-filter.component';
import { DateRangeFilterComponent } from './date-range-filter/date-range-filter.component';

@NgModule({
  declarations: [AutocompleteCompanyFilterComponent, CheckboxFilterComponent, DateRangeFilterComponent],
  exports: [AutocompleteCompanyFilterComponent, CheckboxFilterComponent, DateRangeFilterComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatGridListModule,
    TranslateModule,
    MatCheckbox,
    MatButton,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatListModule,
    MatTooltipModule,
    NgOptimizedImage,
    MatExpansionModule,
    MatBadgeModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptorsFromDi()),
    FilterService,
    FormatService,
    DatePipe,
    FinancialRoleService,
    AuthService,
    CompaniesService,
  ],
})
export class FilterModule {}
