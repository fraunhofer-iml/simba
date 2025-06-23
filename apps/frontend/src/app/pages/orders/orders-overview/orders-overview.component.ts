/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderOverviewDto } from '@ap3/api';
import { ServiceStatesEnum } from '@ap3/util';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ROUTING } from '../../../routing/routing.enum';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrl: './orders-overview.component.scss',
})
export class OrdersOverviewComponent implements OnInit {
  isCustomer: boolean;
  filterText = '';
  dataSource = new MatTableDataSource<OrderOverviewDto>();
  dataSourceOpen = new MatTableDataSource<OrderOverviewDto>();
  dataSourceClosed = new MatTableDataSource<OrderOverviewDto>();
  protected readonly ROUTING = ROUTING;

  constructor(
    private readonly orderService: OrdersService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute
  ) {
    this.isCustomer = this.authService.isCustomer();
    this.loadOrders();
  }

  ngOnInit(): void {
    const possibleId = this.route.snapshot.queryParamMap.get('orderId');
    if (possibleId) {
      this.filterText = possibleId;
    }
  }

  private loadOrders(): void {
    this.orderService.getOrders().subscribe((orders: OrderOverviewDto[]) => {
      this.dataSourceOpen.data = orders.filter((order: OrderOverviewDto) => order.status !== ServiceStatesEnum.PRODUCED);
      this.dataSourceClosed.data = orders.filter((order: OrderOverviewDto) => order.status === ServiceStatesEnum.PRODUCED);
    });
  }

  applyFilter(event: Event) {
    this.filterText = (event.target as HTMLInputElement).value;
  }
}
