/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceProcessStatusDto } from '@ap3/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderFilter } from '../../../model/order-filter';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { FormatService } from '../../../shared/services/util/format.service';
import { OrderDetailsComponent } from './order-details.component';
import { ServiceStatesEnum } from '@ap3/util';

jest.mock('lodash-es', () => ({
  debounce: (fn: any) => fn,
}));

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderDetailsComponent],
      imports: [
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        KeycloakAngularModule
      ],
      providers: [
        OrdersService,
        FilterService<OrderFilter>,
        HttpClient,
        HttpHandler,
        Router,
        TranslateService,
        DatePipe,
        AuthService,
        FormatService,
        DatePipe,
        TranslateService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') return '123';
                  return null;
                },
              },
            },
          },
        },
        {
          provide: KeycloakService,
          useValue: {
            getKeycloakInstance: jest.fn().mockReturnValue({
              profile: {
                attributes: {
                  company: ['pt0001'],
                },
              },
            }),
            getUserRoles: jest.fn().mockReturnValue([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for a status that exists', () => {
    const serviceProcessStatusMock: ServiceProcessStatusDto[] = [
      {
        orderId: 'ORD2506020916050',
        status: ServiceStatesEnum.PLANNED,
        timestamp: new Date(),
      },
    ];

    const result = component.getStatus(serviceProcessStatusMock, ServiceStatesEnum.PLANNED);
    expect(result).toBe(true);
  });

  it('should return the correct icon path for a given status', () => {
    const iconPath = component.getStatusIcon(ServiceStatesEnum.PLANNED);
    expect(iconPath).toBe('./assets/icons/planned.svg');
  });

  it('should return empty tooltip if timestamp is missing', () => {
    const tooltip = component.getStatusTooltip([], ServiceStatesEnum.PLANNED);
    expect(tooltip).toBe('');
  });
});
