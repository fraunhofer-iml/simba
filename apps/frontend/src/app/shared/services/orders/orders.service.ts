/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreateOrderDto, OrderDetailsDto, OrderOverviewDto } from '@ap3/api';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { OrderFilter } from '../../../model/order-filter';
import { ROUTING } from '../../../routing/routing.enum';
import { ApiEndpoints } from '../../constants/endpoints';
import { AuthService } from '../auth/auth.service';
import { FilterService } from '../filter/filter.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
    private readonly orderFilterService: FilterService<OrderFilter>
  ) {}

  public createOrder(order: CreateOrderDto): Observable<OrderOverviewDto> {
    order.customerId = this.authService.getCurrentlyLoggedInCompanyId();
    return this.httpClient.post<OrderOverviewDto>(`${BASE_URL}${ApiEndpoints.orders.getAllOrders}`, order);
  }

  public getOrders(filter?: OrderFilter): Observable<OrderOverviewDto[]> {
    const companyId = this.authService.getCurrentlyLoggedInCompanyId();
    return this.httpClient
      .get<OrderOverviewDto[]>(
        `${BASE_URL}${ApiEndpoints.orders.getAllOrders}`,
        filter
          ? {
              params: this.orderFilterService.processFiltersToHttpParams(filter),
            }
          : {
              params: {
                companyId: companyId,
              },
            }
      )
      .pipe(
        map((orders: OrderOverviewDto[]) => {
          return orders.sort((a, b) => {
            return new Date(b.statusTimestamp).getTime() - new Date(a.statusTimestamp).getTime();
          });
        })
      );
  }

  public getOrderDetailsById(orderId: string): Observable<OrderDetailsDto> {
    const companyId = this.authService.getCurrentlyLoggedInCompanyId();
    return this.httpClient.get<OrderDetailsDto>(`${BASE_URL}${ApiEndpoints.orders.getAllOrders}/${orderId}${ROUTING.details}`, {
      params: {
        companyId: companyId,
      },
    });
  }
}
