/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { GetMachineAssignmentDto, OrderDetailsDto, ServiceProcessStatusDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { FormatService } from '../../../shared/services/util/format.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  id$!: Observable<string>;
  orderDetails$!: Observable<OrderDetailsDto>;
  allFinancialStatus = ['Open', 'Planned', 'Scheduled', 'Produced'];
  displayedColumnsCustomer: string[] = ['robots', 'startDate', 'endDate', 'ownerName'];
  dataSource = new MatTableDataSource<GetMachineAssignmentDto>([]);
  sort?: MatSort;
  paginator?: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceSortAttributes();
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceSortAttributes();
  }

  constructor(
    public readonly formatService: FormatService,
    private readonly ordersService: OrdersService,
    private readonly route: ActivatedRoute,
    private readonly translate: TranslateService,
    private readonly datePipe: DatePipe
  ) {
    this.id$ = this.route.params.pipe(map((params) => params['id']));
    this.orderDetails$ = this.id$.pipe(
      switchMap((id) => this.ordersService.getOrderDetailsById(id)),
      tap((orderDetail) => (this.dataSource.data = orderDetail.machineAssignments))
    );
  }

  setDataSourceSortAttributes() {
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
  }

  getStatusTooltip(allProcessStatus: ServiceProcessStatusDto[], status: string): string {
    const timestamp = this.getStatusTimestamp(allProcessStatus, status);
    if (!timestamp) return '';
    return `${this.translate.instant('Status')}: ${this.translate.instant('OrderStatus.' + status)}
            ${this.translate.instant('StartDate')}: ${this.datePipe.transform(timestamp, this.formatService.getDateFormatByCurrentLang())}
            ${this.translate.instant('Time')}: ${this.datePipe.transform(timestamp, this.formatService.getTimeFormat())}`;
  }

  getStatus(allProcessStatus: ServiceProcessStatusDto[], status: string): boolean {
    return allProcessStatus.some((processStatus) => processStatus.status === status);
  }

  getStatusIcon(status: string): string {
    const iconPath = './assets/icons/';
    return `${iconPath}${status.toLowerCase()}.svg`;
  }

  getStatusTimestamp(allProcessStatus: ServiceProcessStatusDto[], status: string): string {
    const processStatus = allProcessStatus?.find((processStatus) => processStatus.status === status);
    return processStatus?.timestamp ? new Date(processStatus.timestamp).toLocaleString() : '';
  }
}
