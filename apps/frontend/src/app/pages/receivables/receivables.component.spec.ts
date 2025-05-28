/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterOutlet } from '@angular/router';
import { appRoutes } from '../../app.routes';
import { Invoice } from '../../model/invoice';
import { AuthService } from '../../shared/services/auth/auth.service';
import { InvoiceFilterService } from '../../shared/services/invoices/filter/invoice-filter.service';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        InvoiceService,
        AuthService,
        InvoiceService,
        provideHttpClient(),
        DatePipe,
        FormatService,
        InvoiceFilterService,
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
        FinancialRoleService,
      ],
      imports: [
        MatGridListModule,
        MatDividerModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        NoopAnimationsModule,
        RouterOutlet,
        MatSelectModule,
        MatMenuModule,
        NoopAnimationsModule,
        RouterModule.forRoot(appRoutes),
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
    const event = { target: { value: '  TEST  ' } } as unknown as Event;
    component.convertInputAndResetPaginator(event);
    expect(component.dataSource.filter).toBe('test');
  });

  it('should toggle all rows selection', () => {
    component.selection = new SelectionModel<Invoice>(true, []);
    expect(component.selection.selected.length).toBe(0);
    component.toggleSelectionForAllRows();
    expect(component.selection.selected.length).toBe(0);
  });
});
