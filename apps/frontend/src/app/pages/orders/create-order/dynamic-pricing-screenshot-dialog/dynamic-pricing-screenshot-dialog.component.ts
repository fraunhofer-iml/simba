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
  selector: 'app-download-invoice',
  templateUrl: './dynamic-pricing-screenshot-dialog.component.html',
  styleUrl: './dynamic-pricing-screenshot-dialog.component.scss',
})
export class DynamicPricingScreenshotDialogComponent {
  constructor(protected readonly dialogRef: MatDialogRef<DynamicPricingScreenshotDialogComponent>) {}
}
