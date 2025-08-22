/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';
import { FinancialRoleService } from '../../../shared/services/util/financial-role.service';
import { FormatService } from '../../../shared/services/util/format.service';
import { PaidStatisticsComponent } from './paid-statistics.component';

jest.mock('ng2-charts', () => ({
  BaseChartDirective: jest.fn().mockImplementation(() => ({
    ngOnInit: jest.fn(),
    ngOnChanges: jest.fn(),
    update: jest.fn(),
  })),
}));

describe('PaidStatisticsComponent', () => {
  let component: PaidStatisticsComponent;
  let fixture: ComponentFixture<PaidStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaidStatisticsComponent],
      providers: [
        AuthService,
        InvoiceService,
        CurrencyPipe,
        FormatService,
        PercentPipe,
        DatePipe,
        provideHttpClient(),
        FinancialRoleService,
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
      imports: [TranslateModule.forRoot(), MatMenuModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PaidStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectable years and chart', () => {
    expect(component.selectableYears.length).toBeGreaterThan(0);
    expect(component.mixedChartOptions).toBeDefined();
    expect(component.mixedChartData.datasets.length).toBe(4);
  });

  it('should toggle dataset visibility', () => {
    const viability = component.mixedChartData.datasets[0].hidden;
    component.toggleDatasetVisibility(0);
    expect(component.mixedChartData.datasets[0].hidden).toBe(!viability);
  });

  it('should handle year selection and update chart', () => {
    const spy = jest.spyOn(component, 'updateChartDataSet');
    component.onYearSelection(2022);
    expect(component.selectedYear).toBe(2022);
    expect(spy).toHaveBeenCalled();
  });

  it('should return correct CSS class for volume', () => {
    component.mixedChartData.datasets[1] = { label: 'paid-statistics-creditor-volume-color', data: [] };
    const result = component.getCssColorClassVolume('paid-statistics-creditor-volume-color');
    expect(result).toBe('paid-statistics-creditor-volume-color option');
  });

  it('should return correct CSS class for rate', () => {
    component.mixedChartData.datasets[0] = { label: 'paid-statistics-creditor-percentage-color', data: [] };
    const result = component.getCssColorClassRate('paid-statistics-creditor-percentage-color');
    expect(result).toBe('paid-statistics-creditor-percentage-color option');
  });
});
