/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceDto, InvoiceIdAndPaymentStateDto } from '@ap3/api';
import { PaymentStates } from '@ap3/util';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../model/invoice';
import { InvoiceFilter } from '../../model/invoice-filter';
import { FilterService } from '../../shared/services/filter/filter.service';
import { InvoiceService } from '../../shared/services/invoices/invoices.service';
import { DownloadInvoiceDialogComponent } from './download-invoice-dialog/download-invoice-dialog.component';

@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.component.html',
  styleUrl: './receivables.component.scss',
})
export class ReceivablesComponent {
  filterSubject: Observable<boolean>;
  filteredInvoicesIds: string[];
  activatedFiltersCount: number;
  filterText = '';
  paymentStatusChanges: InvoiceIdAndPaymentStateDto[];
  selection = new SelectionModel<Invoice>(true, []);
  dataSourceOpen = new MatTableDataSource<Invoice>();
  dataSourceClosed = new MatTableDataSource<Invoice>();
  private readonly _snackBar = inject(MatSnackBar);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly invoiceService: InvoiceService,
    private readonly translationService: TranslateService,
    private readonly filterService: FilterService<InvoiceFilter>
  ) {
    this.filterService.resetFilter();
    this.filterSubject = this.filterService.getSubject().asObservable();
    this.filterSubject.subscribe((newFilter: boolean) => {
      if (newFilter) {
        this.loadInvoices(this.filterService.getFilter());
        this.activatedFiltersCount = this.countSelectedFilterOptions();
      }
    });
    const paramValue = this.route.snapshot.queryParamMap.get('invoiceNumber');
    this.filterText = paramValue ?? '';
    this.activatedFiltersCount = this.countSelectedFilterOptions();
    this.filteredInvoicesIds = [];
    this.paymentStatusChanges = [];
    this.loadInvoices();
  }

  convertInputAndResetPaginator(event: Event) {
    this.filterText = (event.target as HTMLInputElement).value;
  }

  openDownloadInvoiceDialog() {
    this.dialog.open(DownloadInvoiceDialogComponent, {
      data: this.selection.selected,
      panelClass: 'mat-dialog-container',
      disableClose: true,
    });
  }

  getFilteredData(filter: InvoiceFilter): void {
    this.loadInvoices(this.filterService.getFilter());
    this.activatedFiltersCount = this.countSelectedFilterOptions();
  }

  sendChangeRequest() {
    this.invoiceService.createNewPaymentStatus(this.paymentStatusChanges).subscribe({
      complete: () => this.handleStatusChangeResult(true),
      error: () => this.handleStatusChangeResult(false),
    });
  }

  countSelectedFilterOptions(): number {
    let selectedOptions = 0;
    for (const option of Object.values(this.filterService.getFilter())) {
      if (option) {
        selectedOptions++;
      }
    }
    return selectedOptions;
  }

  openSnackBar(success: boolean): void {
    const message: string = success
      ? this.translationService.instant('PaymentStatus.PaymentStateChangeSuccessfulSnackBarMessage')
      : this.translationService.instant('PaymentStatus.PaymentStateErrorSnackBarMessage');

    const label: string = this.translationService.instant('CloseSnackBarAction');
    this._snackBar.open(message, label);
  }

  private loadInvoices(filter?: InvoiceFilter): void {
    this.invoiceService.getInvoices(filter).subscribe((invoices: InvoiceDto[]) => {
      this.filteredInvoicesIds = invoices.map((invoice: InvoiceDto) => invoice.id);
      this.dataSourceOpen.data = Invoice.convertToInvoice(
        invoices.filter(
          (invoice: InvoiceDto) => invoice.paymentStatus !== PaymentStates.PAID && invoice.paymentStatus !== PaymentStates.FINANCED
        )
      );
      this.dataSourceClosed.data = Invoice.convertToInvoice(
        invoices.filter(
          (invoice: InvoiceDto) => invoice.paymentStatus === PaymentStates.PAID || invoice.paymentStatus === PaymentStates.FINANCED
        )
      );
    });
  }

  private handleStatusChangeResult(statusChange: boolean): void {
    this.loadInvoices();
    this.paymentStatusChanges = [];
    this.openSnackBar(statusChange);
  }
}
