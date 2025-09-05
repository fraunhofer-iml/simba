/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderOverviewDto } from '@ap3/api';
import { ServiceStatesEnum } from '@ap3/util';
import { TranslateService } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrderFilter } from '../../../model/order-filter';
import { ROUTING } from '../../../routing/routing.enum';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { convertToOrderFilter } from '../util/order-filter-util';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrl: './orders-overview.component.scss',
})
export class OrdersOverviewComponent implements OnInit {
  isCustomer: boolean;
  filterText = '';
  activatedFiltersCount: number;
  dataSource = new MatTableDataSource<OrderOverviewDto>();
  dataSourceOpen = new MatTableDataSource<OrderOverviewDto>();
  dataSourceClosed = new MatTableDataSource<OrderOverviewDto>();
  protected readonly ROUTING = ROUTING;

  constructor(
    private readonly orderService: OrdersService,
    readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly orderFilterService: FilterService<OrderFilter>,
    private readonly snackBar: MatSnackBar,
    private readonly translateService: TranslateService,
  ) {
    this.orderFilterService.resetFilter();
    this.activatedFiltersCount = this.orderFilterService.countSelectedFilterOptions();
    this.isCustomer = this.authService.isCustomer();
    this.loadOrders(orderFilterService.getFilter());
  }

  ngOnInit(): void {
    const possibleId = this.route.snapshot.queryParamMap.get('orderId');
    if (possibleId) {
      this.filterText = possibleId;
    }
  }

  private loadOrders(filter: OrderFilter): void {
    this.orderService.getOrders(filter)
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            this.translateService.instant('Error.LoadOrdersFailed'),
            this.translateService.instant('CloseSnackBarAction')
          );
          return throwError(() => err);
        })
      )
      .subscribe((orders: OrderOverviewDto[] | null) => {
        if (orders) {
          this.dataSourceOpen.data = orders.filter((order) => order.status !== ServiceStatesEnum.PRODUCED);
          this.dataSourceClosed.data = orders.filter((order) => order.status === ServiceStatesEnum.PRODUCED);
        }
      });
  }

  applyFilter(event: Event) {
    this.filterText = (event.target as HTMLInputElement).value;
  }

  getFilteredData(filter: OrderFilter): void {
    this.orderFilterService.setFilter(filter);
    this.loadOrders(convertToOrderFilter(this.orderFilterService.getFilter()));
    this.activatedFiltersCount = this.orderFilterService.countSelectedFilterOptions();
  }
}
