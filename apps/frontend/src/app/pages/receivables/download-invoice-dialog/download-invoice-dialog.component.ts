/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { FileSaverService } from 'ngx-filesaver';
import { catchError, throwError } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';

@Component({
  selector: 'app-download-invoice',
  templateUrl: './download-invoice-dialog.component.html',
  styleUrl: './download-invoice-dialog.component.scss',
})
export class DownloadInvoiceDialogComponent {
  selectedInvoice = new FormControl<InvoiceDto | null>(null);
  safeUrls: Map<string, SafeResourceUrl> | null = new Map<string, SafeResourceUrl>();
  constructor(
    public dialogRef: MatDialogRef<DownloadInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvoiceDto[],
    private readonly invoiceService: InvoiceService,
    private readonly sanitizer: DomSanitizer,
    private readonly fileSaverService: FileSaverService,
    private readonly snackBar: MatSnackBar,
    private readonly translateService: TranslateService
  ) {
    this.selectedInvoice.setValue(data[0]);
    for (const invoice of data) {
      if (this.safeUrls) {
        this.safeUrls = this.safeUrls.set(invoice.id, this.getSource(invoice.url + '#view=Fit'));
      }
    }
  }

  getSource(url: string): SafeResourceUrl {
    const sanitized = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return sanitized;
  }

  downloadInvoices() {
    this.data.forEach((invoice) => {
      this.invoiceService.downloadInvoicePdf(invoice.url)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              this.translateService.instant('Error.DownloadInvoicesFailed'),
              this.translateService.instant('CloseSnackBarAction')
              );
            return throwError(() => err);
          })
        )
        .subscribe((res) => {
          if (res) {
            this.fileSaverService.save(res, `${invoice.invoiceNumber}.pdf`);
          }
        });
    });
  }

  changeTab(index: number) {
    this.selectedInvoice.setValue(this.data[index]);
  }

  getSelectedInvoiceId() {
    return this.selectedInvoice.value?.invoiceNumber ?? '';
  }
}
