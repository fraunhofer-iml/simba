/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';
import { FinancialRoleService } from '../../../shared/services/util/financial-role.service';
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
        InvoiceService,
        provideHttpClient(),
        { provide: TranslatePipe, useValue: jest.fn((value: string) => value) },
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

        AuthService,
      ],
      imports: [TranslateModule.forRoot(), MatMenuModule],
      schemas: [NO_ERRORS_SCHEMA], // since provideCharts(withDefaultRegisterables()) doesnt get recognized as a function, canvas cant be given the datasets property
    }).compileComponents();

    fixture = TestBed.createComponent(PaidStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
