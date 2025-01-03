import { InvoiceDto } from '@ap3/api';
import { FileSaverService } from 'ngx-filesaver';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';

@Component({
  selector: 'app-download-invoice',
  templateUrl: './download-invoice-dialog.component.html',
  styleUrl: './download-invoice-dialog.component.scss',
})
export class DownloadInvoiceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DownloadInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvoiceDto[],
    private readonly invoiceService: InvoiceService,
    private readonly sanitizer: DomSanitizer,
    private readonly fileSaverService: FileSaverService
  ) {}

  getSource(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  downloadInvoices() {
    this.data.forEach((invoice) => {
      this.invoiceService
        .downloadInvoicePdf(invoice.url)
        .subscribe((res) => this.fileSaverService.save(res, `${invoice.invoiceNumber}.pdf`));
    });
  }
}
