/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { NgxEchartsModule } from 'ngx-echarts';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FilterService } from '../../shared/services/filter/filter.service';
import { OrdersService } from '../../shared/services/orders/orders.service';
import { FormatService } from '../../shared/services/util/format.service';
import { ProductionComponent } from './production.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SchedulingChartBuilder } from './scheduling-chart/scheduling-chart-builder';

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: class {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  },
});

describe('ProductionComponent', () => {
  let component: ProductionComponent;
  let fixture: ComponentFixture<ProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionComponent],
      imports: [
        MatDividerModule,
        TranslateModule.forRoot(),
        NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
        HttpClientModule,
        MatButtonToggleModule,
        MatIconModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        OrdersService,
        AuthService,
        FilterService,
        FormatService,
        DatePipe,
        {
          provide: KeycloakService,
          useValue: {
            getKeycloakInstance: jest.fn().mockReturnValue({
              profile: { attributes: { company: ['pt0001'] } },
            }),
            getUserRoles: jest.fn().mockReturnValue([]),
          },
        },
        {
          provide: MatSnackBar,
          useValue: { open: jest.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionComponent);
    component = fixture.componentInstance;
    component['changeView'] = jest.fn();

    jest.spyOn(SchedulingChartBuilder, 'buildGanttChart').mockReturnValue({});
    jest.spyOn(SchedulingChartBuilder, 'buildViewTitle').mockReturnValue('title');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call changeView with day when currentView is week', () => {
    component['currentView'] = component['DateEnum'].WEEK;
    const date = new Date('2025-10-13T15:00:00Z');
    const event = { value: [0, date.toISOString()] };

    component['onChartClick'](event);

    expect(component['changeView']).toHaveBeenCalledTimes(1);
    const [view, dayStart] = (component['changeView'] as jest.Mock).mock.calls[0];
    expect(view).toBe(component['DateEnum'].DAY);
    expect(dayStart.getHours()).toBe(0);
    expect(dayStart.getMinutes()).toBe(0);
  });

  it('should call changeView with hour when currentView is day', () => {
    component['currentView'] = component['DateEnum'].DAY;
    const date = new Date('2025-10-13T15:00:00Z');
    const event = { value: [0, date.toISOString()] };

    component['onChartClick'](event);

    expect(component['changeView']).toHaveBeenCalledTimes(1);
    const [view, hourStart] = (component['changeView'] as jest.Mock).mock.calls[0];
    expect(view).toBe(component['DateEnum'].HOUR);
    expect(hourStart.getMinutes()).toBe(0);
    expect(hourStart.getSeconds()).toBe(0);
  });
});
