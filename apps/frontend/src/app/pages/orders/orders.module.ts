;
/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule } from '@ngx-translate/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CountdownComponent } from 'ngx-countdown';
import { CommonModule, DatePipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import { DialogOffersExpiredComponent } from '../../layout/dialog-offers-expired/dialog-offers-expired.component';
import { OrderFilter } from '../../model/order-filter';
import { FilterModule } from '../../shared/components/filter/filter.module';
import { YEAR_FORMAT } from '../../shared/formats/datepicker-format';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FilterService } from '../../shared/services/filter/filter.service';
import { OffersService } from '../../shared/services/offers/offers.service';
import { OrdersService } from '../../shared/services/orders/orders.service';
import { ProductService } from '../../shared/services/product/product.service';
import { CalendarWeekService } from '../../shared/services/util/calendar-week.service';
import { FormatService } from '../../shared/services/util/format.service';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersFilterComponent } from './orders-filter/orders-filter.component';
import { OrderTableComponent } from './orders-overview/order-table/order-table.component';
import { OrdersOverviewComponent } from './orders-overview/orders-overview.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [
    OrdersFilterComponent,
    OrdersOverviewComponent,
    CreateOrderComponent,
    DialogOffersExpiredComponent,
    OrderDetailsComponent,
    OrderTableComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatBadgeModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    OrdersRoutingModule,
    NgOptimizedImage,
    CountdownComponent,
    BaseChartDirective,
    TranslateModule,
    MatTooltip,
    MatTabGroup,
    MatTab,
    FilterModule,
  ],
  providers: [
    OffersService,
    OrdersService,
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptorsFromDi()),
    provideCharts(withDefaultRegisterables()),
    ProductService,
    CalendarWeekService,
    FormatService,
    DatePipe,
    FilterService<OrderFilter>,
    provideNativeDateAdapter(),
    provideMomentDateAdapter(YEAR_FORMAT),
    TitleCasePipe,
    AuthService,
  ],
  exports: [OrderTableComponent],
})
export class OrdersModule {}
