/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { GetMachineAssignmentDto, OrderDetailsDto, ServiceProcessStatusDto } from '@ap3/api';
import { ALL_SERVICE_STATES_FOR_DETAILS } from '@ap3/util';
import { TranslateService } from '@ngx-translate/core';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { FormatService } from '../../../shared/services/util/format.service';
import { centerTextPlugin } from './diagram-plugins/diagram-plugins';
import { OrderDetailsUtils } from './order-details.util';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  translation: Subscription;
  id$: string | null;
  orderDetails$: Observable<OrderDetailsDto>;
  allFinancialStatus = ALL_SERVICE_STATES_FOR_DETAILS;
  displayedColumnsCustomer: string[] = ['robots', 'startDate', 'endDate', 'ownerName'];
  dataSource = new MatTableDataSource<GetMachineAssignmentDto>([]);
  sort?: MatSort;
  paginator?: MatPaginator;

  doughnutChartOptions: ChartOptions = {};
  plugins: Plugin[] = [ChartDataLabels];
  doughnutChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

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
    private readonly translate: TranslateService
  ) {
    this.id$ = this.route.snapshot.paramMap.get('id');
    if (!this.id$) throw new Error('ID parameter is missing from the route.');
    this.orderDetails$ = this.ordersService.getOrderDetailsById(this.id$).pipe(
      tap((orderDetail: OrderDetailsDto): void => {
        this.dataSource.data = orderDetail.machineAssignments;
        if (orderDetail.offer) {
          this.initDoughnutChart([orderDetail.offer.basePrice, orderDetail.offer.utilizationPrice, orderDetail.offer.fixedCosts]);
        }
      })
    );

    this.translation = translate.onLangChange
      .pipe(
        map(() => {
          this.updateLabelTranslations();
        })
      )
      .subscribe();
  }

  setDataSourceSortAttributes() {
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
  }

  getStatusTooltip(allProcessStatus: ServiceProcessStatusDto[], status: string): string {
    const timestamp = this.getStatusTimestamp(allProcessStatus, status);
    if (!timestamp) return '';

    return `${this.translate.instant('Orders.OrderTable.Status')}: ${this.translate.instant('Orders.Status.' + status)}
            ${this.translate.instant('Nft.Date')}: ${timestamp}`;
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

  initDoughnutChart(priceData: number[]): void {
    this.plugins.push(centerTextPlugin(priceData.reduce((sum, price) => sum + price, 0)));
    this.doughnutChartOptions = OrderDetailsUtils.buildOptionsConfig(this.translate);
    this.doughnutChartData = OrderDetailsUtils.buildDataset(this.translate.instant('Orders.Details.Diagram.DoughnutLabels'), priceData);
    this.updateLabelTranslations();
    this.chart?.update();
  }

  updateLabelTranslations() {
    this.doughnutChartData.labels = this.translate.instant('Orders.Details.Diagram.DoughnutLabels');
    this.chart?.update();
  }
}
