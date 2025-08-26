import { MatIconModule } from '@angular/material/icon';

;
/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceStatesEnum } from '@ap3/util';
import { TranslateModule } from '@ngx-translate/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ordersOverviewMock } from '../../../shared/mocks/orderOverviewMock';
import { OrderFilter } from '../../../model/order-filter';
import { FilterModule } from '../../../shared/components/filter/filter.module';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { CalendarWeekService } from '../../../shared/services/util/calendar-week.service';
import { FormatService } from '../../../shared/services/util/format.service';
import { OrdersFilterComponent } from '../orders-filter/orders-filter.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { OrdersOverviewComponent } from './orders-overview.component';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

describe('OrdersOverviewComponent', () => {
  let component: OrdersOverviewComponent;
  let fixture: ComponentFixture<OrdersOverviewComponent>;
  let mockOrdersService: jest.Mocked<OrdersService>;

  beforeEach(async () => {
    registerLocaleData(localeDe);

    mockOrdersService = {
      getOrders: jest.fn().mockReturnValue(of(ordersOverviewMock)),
    } as unknown as jest.Mocked<OrdersService>;

    await TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
        MatTabsModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        MatBadgeModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        KeycloakAngularModule,
        FilterModule,
        MatIconModule
      ],
      providers: [
        { provide: OrdersService, useValue: mockOrdersService },
        { provide: LOCALE_ID, useValue: 'de-DE' },
        provideHttpClient(),
        provideNativeDateAdapter(),
        DatePipe,
        AuthService,
        FormatService,
        CalendarWeekService,
        FilterService<OrderFilter>,
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
      declarations: [OrdersOverviewComponent, OrderTableComponent, OrdersFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders and split open/closed correctly', () => {
    expect(mockOrdersService.getOrders).toHaveBeenCalled();
    expect(component.dataSourceOpen.data.length).toBe(1);
    expect(component.dataSourceClosed.data.length).toBe(1);

    const openOrder = component.dataSourceOpen.data[0];
    const closedOrder = component.dataSourceClosed.data[0];

    expect(openOrder.status).not.toBe(ServiceStatesEnum.PRODUCED);
    expect(closedOrder.status).toBe(ServiceStatesEnum.PRODUCED);
  });

  it('should update filterText on applyFilter', () => {
    const mockEvent = {
      target: { value: 'EcoTrade Solutions AG' },
    } as unknown as Event;

    component.applyFilter(mockEvent);
    expect(component.filterText).toBe('EcoTrade Solutions AG');
  });
});
