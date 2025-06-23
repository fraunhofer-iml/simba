/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { UnpaidStatisticsDto } from '@ap3/api';
import { FinancialRoles, PaymentStates } from '@ap3/util';
import { Observable, of } from 'rxjs';
import { Component, Input, OnChanges } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { InvoiceFilterService } from '../../../shared/services/invoices/filter/invoice-filter.service';
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
    public readonly formatService: FormatService,
    private readonly invoiceService: InvoiceService,
    readonly authService: AuthService,
    private readonly filterService: InvoiceFilterService
  ) {
    this.creditorStatisticsDto$ = of();
    this.debtorStatisticsDto$ = of();
  }

  ngOnChanges(): void {
    this.creditorStatisticsDto$ = this.invoiceService.getUnPaidStatistics(this.invoiceIds, FinancialRoles.CREDITOR);
    this.debtorStatisticsDto$ = this.invoiceService.getUnPaidStatistics(this.invoiceIds, FinancialRoles.DEBTOR);
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
