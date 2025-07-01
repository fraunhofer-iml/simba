/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { OrdersService } from './orders.service';
import { OrderDetailsDto } from '@ap3/api';
import { of } from 'rxjs';
import { ApiEndpoints } from '../../constants/endpoints';
import { BASE_URL } from '../../../../environments/environment';
import { ROUTING } from '../../../routing/routing.enum';
import { ordersOverviewMock } from '../../mocks/orderOverviewMock';
import { createOrderMock } from '../../mocks/createOrderMock';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpClientMock: jest.Mocked<HttpClient>;
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(() => {
    httpClientMock = {
      post: jest.fn(),
      get: jest.fn()
    } as any;

    authServiceMock = {
      getCurrentlyLoggedInCompanyId: jest.fn()
    } as any;

    service = new OrdersService(httpClientMock, authServiceMock);
  });

  it('should create order with customerId from authService', (done) => {
    authServiceMock.getCurrentlyLoggedInCompanyId.mockReturnValue('company');
    httpClientMock.post.mockReturnValue(of(ordersOverviewMock[0]));

    service.createOrder(createOrderMock).subscribe((res) => {
      expect(res).toEqual(ordersOverviewMock[0]);
      expect(createOrderMock.customerId).toBe('company');
      expect(httpClientMock.post).toHaveBeenCalledWith(
        `${BASE_URL}${ApiEndpoints.orders.getAllOrders}`,
        createOrderMock
      );
      done();
    });
  });

  it('should fetch and sort orders by statusTimestamp descending', (done) => {
    authServiceMock.getCurrentlyLoggedInCompanyId.mockReturnValue('company');
    httpClientMock.get.mockReturnValue(of(ordersOverviewMock));

    service.getOrders().subscribe((order) => {
      expect(order[0].id).toBe('ORD2506020916050');
      expect(order[1].id).toBe('ORD25060278786050');
      expect(httpClientMock.get).toHaveBeenCalledWith(
        `${BASE_URL}${ApiEndpoints.orders.getAllOrders}`,
        { params: { companyId: 'company' } }
      );
      done();
    });
  });

  it('should fetch order details by ID with companyId from authService', (done) => {
    const orderDetailsMock: OrderDetailsDto = {
      order: ordersOverviewMock[0],
      processStateHistory: [],
      machineAssignments: []
    }

    authServiceMock.getCurrentlyLoggedInCompanyId.mockReturnValue('company');
    httpClientMock.get.mockReturnValue(of(orderDetailsMock));

    service.getOrderDetailsById('ORD25060278786050').subscribe((order) => {
      expect(order).toEqual(orderDetailsMock);
      expect(httpClientMock.get).toHaveBeenCalledWith(
        `${BASE_URL}${ApiEndpoints.orders.getAllOrders}/ORD25060278786050${ROUTING.details}`,
        { params: { companyId: 'company' } }
      );
      done();
    });
  });
});
