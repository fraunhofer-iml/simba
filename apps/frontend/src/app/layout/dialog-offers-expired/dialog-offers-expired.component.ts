/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

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
