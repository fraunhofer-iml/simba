import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-offers-expired',
  templateUrl: './dialog-offers-expired.component.html',
  styleUrl: './dialog-offers-expired.component.scss',
})
export class DialogOffersExpiredComponent {
  constructor(private readonly dialogRef: MatDialogRef<DialogOffersExpiredComponent>) {}

  accept() {
    this.dialogRef.close();
  }
}
