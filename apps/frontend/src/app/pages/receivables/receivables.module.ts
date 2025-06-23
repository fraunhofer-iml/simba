/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule } from '@ngx-translate/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { FileSaverModule } from 'ngx-filesaver';
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
import { AuthService } from '../../shared/services/auth/auth.service';
import { CompaniesService } from '../../shared/services/companies/companies.service';
import { InvoiceFilterService } from '../../shared/services/invoices/filter/invoice-filter.service';
import { InvoiceService } from '../../shared/services/invoices/invoices.service';
import { FinancialRoleService } from '../../shared/services/util/financial-role.service';
import { FormatService } from '../../shared/services/util/format.service';
import { DownloadInvoiceDialogComponent } from './download-invoice-dialog/download-invoice-dialog.component';
import { InvoiceFilterComponent } from './filter/invoice-filter.component';
import { PaidStatisticsComponent } from './paid-statistics/paid-statistics.component';
import { ReceivablesRoutingModule } from './receivables-routing.module';
import { ReceivablesComponent } from './receivables.component';
import { TokenDetailsDialogComponent } from './token-details-dialog/token-details-dialog.component';
import { UnpaidStatisticsComponent } from './unpaid-statistics/unpaid-statistics.component';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';

@NgModule({
  declarations: [
    ReceivablesComponent,
    PaidStatisticsComponent,
    UnpaidStatisticsComponent,
    DownloadInvoiceDialogComponent,
    TokenDetailsDialogComponent,
    InvoiceFilterComponent,
    InvoiceTableComponent
  ],
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
    ReceivablesRoutingModule,
    MatGridListModule,
    TranslateModule,
    MatCheckbox,
    MatButton,
    BaseChartDirective,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    FileSaverModule,
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
    provideCharts(withDefaultRegisterables()),
    InvoiceService,
    FormatService,
    DatePipe,
    FinancialRoleService,
    AuthService,
    CompaniesService,
    InvoiceFilterService,
  ],
})
export class ReceivablesModule {}
