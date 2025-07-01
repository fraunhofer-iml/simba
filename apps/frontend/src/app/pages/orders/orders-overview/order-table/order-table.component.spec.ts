/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderOverviewDto } from '@ap3/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CalendarWeekService } from '../../../../shared/services/util/calendar-week.service';
import { FormatService } from '../../../../shared/services/util/format.service';
import { OrderTableComponent } from './order-table.component';
import { ordersOverviewMock } from '../../../../shared/mocks/orderOverviewMock';
import { ServiceStatesEnum } from '@ap3/util';

describe('OrderTableComponent', () => {
  let component: OrderTableComponent;
  let fixture: ComponentFixture<OrderTableComponent>;
  let formatServiceMock: Partial<FormatService>;

  beforeEach(async () => {
    formatServiceMock = {
      transformDateToCurrentLanguageFormat: jest.fn(() => '01.06.2025'),
      transformNumberToCurrentLanguageFormat: jest.fn(),
      getCurrentLocaleFormatter: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [OrderTableComponent],
      imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      providers: [DatePipe, TranslateService, CalendarWeekService, { provide: FormatService, useValue: formatServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderTableComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource<OrderOverviewDto>(ordersOverviewMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getScheduledFor() for planned status', () => {
    const result = component.getScheduledFor(12, 2024);
    expect(result).toBe('CalendarWeek 12, 2024');
  });

  it('should sort by number', () => {
    const accessor = component.dataSource.sortingDataAccessor;
    expect(accessor).toBeDefined();

    const price = accessor?.(ordersOverviewMock[0], 'number');
    expect(price).toBe('1001');
  });

  it('should filter by transformed date', () => {
    (formatServiceMock.transformDateToCurrentLanguageFormat as jest.Mock).mockReturnValue('01.06.2025');
    component.filterValue = '01.06.2025';
    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].status).toBe(ServiceStatesEnum.PRODUCED);
  });
});
