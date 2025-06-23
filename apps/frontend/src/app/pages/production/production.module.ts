/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    ProductionComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    ProductionRoutingModule,
    TranslateModule
  ]
})
export class ProductionModule { }
