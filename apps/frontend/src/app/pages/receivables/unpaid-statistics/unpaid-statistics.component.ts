/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { UnpaidStatisticsDto } from '@ap3/api';
import { FinancialRoles, PaymentStates } from '@ap3/util';
import { TranslateService } from '@ngx-translate/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Component, Input, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoiceFilter } from '../../../model/invoice-filter';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';
import { FormatService } from '../../../shared/services/util/format.service';

@Component({
  selector: 'app-unpaid-statistics',
  templateUrl: './unpaid-statistics.component.html',
  styleUrl: './unpaid-statistics.component.scss',
})
export class UnpaidStatisticsComponent implements OnChanges {
  creditorStatisticsDto$: Observable<UnpaidStatisticsDto>;
  debtorStatisticsDto$: Observable<UnpaidStatisticsDto>;
  @Input({ required: true }) invoiceIds: string[] = [];

  constructor(
    readonly authService: AuthService,
    public readonly formatService: FormatService,
    private readonly invoiceService: InvoiceService,
    private readonly snackBar: MatSnackBar,
    private readonly translateService: TranslateService,
    private readonly filterService: FilterService<InvoiceFilter>
  ) {
    this.creditorStatisticsDto$ = of();
    this.debtorStatisticsDto$ = of();
  }

  ngOnChanges(): void {
    this.creditorStatisticsDto$ = this.invoiceService
      .getUnPaidStatistics(this.invoiceIds, FinancialRoles.CREDITOR)
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            this.translateService.instant('Error.GetUnpaidStatisticsFailed'),
            this.translateService.instant('CloseSnackBarAction')
          );
          return throwError(() => err);
        })
      );

    this.debtorStatisticsDto$ = this.invoiceService
      .getUnPaidStatistics(this.invoiceIds, FinancialRoles.DEBTOR)
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            this.translateService.instant('Error.GetUnpaidStatisticsFailed'),
            this.translateService.instant('CloseSnackBarAction')
          );
          return throwError(() => err);
        })
      );
  }

  setInvoiceFilterToLiabilities() {
    this.filterService.setFilter({ debtorId: this.authService.getCurrentlyLoggedInCompanyId() });
  }

  setInvoiceFilterToDemands() {
    this.filterService.setFilter({ creditorId: this.authService.getCurrentlyLoggedInCompanyId() });
  }

  setInvoiceFilterToOpen() {
    this.filterService.setFilter({ paymentStates: [PaymentStates.OPEN] });
  }

  setInvoiceFilterToOverdue() {
    this.filterService.setFilter({ paymentStates: [PaymentStates.EXCEEDED] });
  }
}
