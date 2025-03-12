/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { UnpaidStatisticsDto } from '@ap3/api';
import { FinancialRoles } from '@ap3/util';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';

@Component({
  selector: 'app-unpaid-statistics',
  templateUrl: './unpaid-statistics.component.html',
  styleUrl: './unpaid-statistics.component.scss',
})
export class UnpaidStatisticsComponent {
  creditorStatisticsDto$: Observable<UnpaidStatisticsDto>;
  debtorStatisticsDto$: Observable<UnpaidStatisticsDto>;

  constructor(
    private readonly invoiceService: InvoiceService,
    readonly authService: AuthService
  ) {
    this.creditorStatisticsDto$ = invoiceService.getUnPaidStatistics(FinancialRoles.CREDITOR);
    this.debtorStatisticsDto$ = invoiceService.getUnPaidStatistics(FinancialRoles.DEBTOR);
  }
}
