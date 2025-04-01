/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderOverviewDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ROUTING } from '../../../routing/routing.enum';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { DateFormatService } from '../../../shared/services/util/date-format.service';
import { OrderStatus } from './enum/orderStatus';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrl: './orders-overview.component.scss',
})
export class OrdersOverviewComponent implements AfterViewInit {
  isCustomer: boolean;
  displayedColumnsAdminContributor: string[] = [
    'orderId',
    'status',
    'productionDate',
    'price',
    'currency',
    'products',
    'amount',
    'robots',
    'customerName',
    'invoiceNumber',
  ];
  displayedColumnsCustomer: string[] = [
    'orderId',
    'status',
    'productionDate',
    'price',
    'currency',
    'products',
    'amount',
    'robots',
    'invoiceNumber',
  ];
  dataSource = new MatTableDataSource<OrderOverviewDto>();
  dataSourceObservable!: Observable<MatTableDataSource<OrderOverviewDto>>;
  sort?: MatSort;
  protected readonly ROUTING = ROUTING;
  protected readonly OrderStatus = OrderStatus;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceSortAttribute();
  }

  constructor(
    private readonly orderService: OrdersService,
    private readonly translate: TranslateService,
    private readonly dateFormatService: DateFormatService,
    private readonly authService: AuthService
  ) {
    this.isCustomer = authService.isCustomer();
    this.initializeDataSource();
    this.setFilterPredicate();
    this.setSortingPredicate();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private setFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: OrderOverviewDto, value: string): boolean => {
      let productionDate = false;
      if (data.status == OrderStatus.planned) {
        productionDate = this.getScheduledFor(data.calendarWeek, data.year).toLowerCase().includes(value);
      } else {
        productionDate = this.dateFormatService.transformDateToCurrentLanguageFormat(data.statusTimestamp).includes(value);
      }
      return (
        data.number.toLowerCase().includes(value) ||
        this.translate.instant(`OrderStatus.${data.status}`).includes(value) ||
        `${data.price.toFixed(2)}`.toLowerCase().includes(value) ||
        data.currency.toLowerCase().includes(value) ||
        data.product.toLowerCase().includes(value) ||
        data.amount.toFixed().includes(value) ||
        data.robots.some((robot) => robot.toLowerCase().includes(value)) ||
        productionDate ||
        data.customerName.toLowerCase().includes(value) ||
        data.invoiceNumber.toLowerCase().includes(value)
      );
    };
  }

  private initializeDataSource(): void {
    this.dataSourceObservable = this.orderService.getOrders().pipe(
      map((orders: OrderOverviewDto[]) => {
        this.dataSource.data = orders;
        return this.dataSource;
      })
    );
  }

  private setSortingPredicate() {
    this.dataSource.sortingDataAccessor = (order: any, property) => {
      if (property === 'statusTimestamp' && order.status === OrderStatus.planned) {
        return this.dateFormatService.getTimestampFromCalendarWeek(order.year, order.calendarWeek).toISOString();
      }
      return order[property];
    };
  }

  getDateFormat() {
    return this.dateFormatService.getDateFormatByCurrentLang();
  }

  setDataSourceSortAttribute() {
    this.dataSource.sort = this.sort ?? null;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getScheduledFor(cw: number, year: number) {
    return `${this.translate.instant('CalendarWeek')} ${cw}, ${year}`;
  }
}
