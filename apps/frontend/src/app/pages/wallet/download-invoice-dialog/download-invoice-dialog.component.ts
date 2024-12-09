import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-download-invoice',
  templateUrl: './download-invoice-dialog.component.html',
  styleUrl: './download-invoice-dialog.component.scss',
})
export class DownloadInvoiceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DownloadInvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: []
  ) {}
}
