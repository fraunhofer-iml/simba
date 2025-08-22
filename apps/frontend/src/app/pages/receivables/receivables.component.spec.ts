/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { activatedRouteMock } from '@ap3/api';
import { TranslateModule } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs';
import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { InvoiceFilter } from '../../model/invoice-filter';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FilterService } from '../../shared/services/filter/filter.service';
import { InvoiceService } from '../../shared/services/invoices/invoices.service';
import { FinancialRoleService } from '../../shared/services/util/financial-role.service';
import { FormatService } from '../../shared/services/util/format.service';
import { PaidStatisticsComponent } from './paid-statistics/paid-statistics.component';
import { ReceivablesComponent } from './receivables.component';
import { UnpaidStatisticsComponent } from './unpaid-statistics/unpaid-statistics.component';

jest.mock('ng2-charts', () => ({
  BaseChartDirective: jest.fn().mockImplementation(() => ({
    ngOnInit: jest.fn(),
    ngOnChanges: jest.fn(),
    update: jest.fn(),
  })),
}));

describe('ReceivablesComponent', () => {
  let component: ReceivablesComponent;
  let fixture: ComponentFixture<ReceivablesComponent>;

  const mockDialog = {
    open: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        FormatService,
        DatePipe,
        CurrencyPipe,
        PercentPipe,
        InvoiceService,
        AuthService,
        InvoiceService,
        provideHttpClient(),
        FilterService<InvoiceFilter>,
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
        { provide: MatDialog, useValue: mockDialog },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        FinancialRoleService,
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        NoopAnimationsModule,
        RouterOutlet,
        MatSelectModule,
        MatMenuModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ReceivablesComponent, UnpaidStatisticsComponent, PaidStatisticsComponent],
      schemas: [NO_ERRORS_SCHEMA], // From PaidStatistics spec
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply a trimmed and lowercased filter value', () => {
    const event = { target: { value: 'test' } } as unknown as Event;
    component.convertInputAndResetPaginator(event);
    expect(component.filterText).toBe('test');
  });

  it('should open download dialog', () => {
    component.openDownloadInvoiceDialog();
    expect(mockDialog.open).toHaveBeenCalled();
  });
});
