/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { DatePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';
import { FormatService } from '../../../shared/services/util/format.service';
import { TokenDetailsDialogComponent } from '../token-details-dialog/token-details-dialog.component';
import { DownloadInvoiceDialogComponent } from './download-invoice-dialog.component';
import { MatIconModule } from '@angular/material/icon';

describe('DownloadInvoiceDialogComponent', () => {
  let component: DownloadInvoiceDialogComponent;
  let fixture: ComponentFixture<DownloadInvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadInvoiceDialogComponent, TokenDetailsDialogComponent],
      imports: [MatDialogModule, MatTabsModule, TranslateModule.forRoot(), NoopAnimationsModule, MatIconModule],
      providers: [
        InvoiceService,
        TranslateModule,
        AuthService,
        FormatService,
        provideHttpClient(),
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: [
            { invoiceNumber: 'INV001', url: 'path/to/invoice1.pdf' },
            { invoiceNumber: 'INV002', url: 'path/to/invoice2.pdf' },
          ],
        },
        DatePipe,
        { provide: TranslatePipe, useValue: jest.fn((value: string) => value) },
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

    fixture = TestBed.createComponent(DownloadInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
