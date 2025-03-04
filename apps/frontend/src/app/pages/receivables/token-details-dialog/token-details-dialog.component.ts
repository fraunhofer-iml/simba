import { TokenReadDto } from 'nft-folder-blockchain-connector';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-token-details',
  templateUrl: './token-details-dialog.component.html',
  styleUrl: './token-details-dialog.component.scss',
})
export class TokenDetailsDialogComponent {
  invoiceNft: Observable<TokenReadDto>;

  constructor(
    public dialogRef: MatDialogRef<TokenDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public invoiceNumber: string,
    private readonly invoiceService: InvoiceService,
  ) {
    this.invoiceNft = this.invoiceService.getNftByInvoiceNumber(invoiceNumber);
  }
}
