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
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormatService } from '../../../../shared/services/util/format.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
})
export class OrderTableComponent implements AfterViewInit {
  @Input() dataSource!: MatTableDataSource<OrderOverviewDto>;
  @Input() isCustomer = false;
  @Input() set filterValue(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumnsAdmin: string[] = [
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

  protected readonly OrderStatus = ServiceStatesEnum;

  constructor(
    public formatService: FormatService,
    private readonly translate: TranslateService
  ) {}

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.setFilterPredicate();
      this.setSortingPredicate();
    }
  }

  getScheduledFor(cw: number, year: number) {
    return `${this.translate.instant('CalendarWeek')} ${cw}, ${year}`;
  }

  private setFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: OrderOverviewDto, value: string): boolean => {
      let productionDate: boolean;
      if (data.status == ServiceStatesEnum.PLANNED) {
        productionDate = this.getScheduledFor(data.calendarWeek, data.year).toLowerCase().includes(value);
      } else {
        productionDate = this.formatService.transformDateToCurrentLanguageFormat(data.statusTimestamp).includes(value);
      }
      return (
        data.number.toLowerCase().includes(value) ||
        this.translate.instant(`Orders.Status.${data.status}`).includes(value) ||
        `${this.getNumberInCurrentLangFormat(data.price)}`.includes(value) ||
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

  private setSortingPredicate() {
    this.dataSource.sortingDataAccessor = (data: OrderOverviewDto, property: string): string | number => {
      let productionDate = '';
      if (property === 'productionDate') {
        productionDate =
          data.status === ServiceStatesEnum.PLANNED
            ? this.getScheduledFor(data.year, data.calendarWeek).toLowerCase()
            : this.formatService.transformDateToCurrentLanguageFormat(data.statusTimestamp);
      }

      return (
        data.number.toLowerCase() ||
        this.translate.instant(`Orders.Status.${data.status}`) ||
        this.getNumberInCurrentLangFormat(data.price) ||
        data.currency.toLowerCase() ||
        data.product.toLowerCase() ||
        data.amount ||
        data.robots.join(',').toLowerCase() ||
        productionDate ||
        data.customerName.toLowerCase() ||
        data.invoiceNumber.toLowerCase()
      );
    };
  }

  private getNumberInCurrentLangFormat(number: number): string {
    return this.formatService.transformNumberToCurrentLanguageFormat(number);
  }
}
