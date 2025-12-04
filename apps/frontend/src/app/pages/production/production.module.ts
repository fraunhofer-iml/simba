/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule } from '@ngx-translate/core';
import { NgxEchartsDirective, NgxEchartsModule } from 'ngx-echarts';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FilterService } from '../../shared/services/filter/filter.service';
import { OrdersService } from '../../shared/services/orders/orders.service';
import { FormatService } from '../../shared/services/util/format.service';
import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


@NgModule({
  declarations: [ProductionComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    ProductionRoutingModule,
    TranslateModule,
    NgxEchartsDirective,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    MatProgressSpinner,
    MatButton,
    MatButtonToggleGroup,
    MatButtonToggle,
    FormsModule,
    MatIcon,
    MatIconButton,
  ],
  providers: [OrdersService, FilterService, FormatService, DatePipe, provideHttpClient(withInterceptorsFromDi())],
})
export class ProductionModule {}
