/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrl: './production.component.scss'
})
export class ProductionComponent {
  streamUrl: SafeResourceUrl;

  constructor(private readonly sanitizer: DomSanitizer) {
    this.streamUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://unity.flw.mb.tu-dortmund.de');
  }
}
