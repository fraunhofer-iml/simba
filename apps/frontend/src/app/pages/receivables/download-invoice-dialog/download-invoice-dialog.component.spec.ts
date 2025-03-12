/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';
import { DownloadInvoiceDialogComponent } from './download-invoice-dialog.component';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { KeycloakService } from 'keycloak-angular';

describe('DownloadInvoiceDialogComponent', () => {
  let component: DownloadInvoiceDialogComponent;
  let fixture: ComponentFixture<DownloadInvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadInvoiceDialogComponent],
      imports: [MatDialogModule, MatTabsModule, TranslateModule.forRoot(), NoopAnimationsModule],

      providers: [
        InvoiceService,
        TranslateModule,
        AuthService,
        provideHttpClient(),
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: [
            { invoiceNumber: 'INV001', url: 'path/to/invoice1.pdf' },
            { invoiceNumber: 'INV002', url: 'path/to/invoice2.pdf' },
          ],
        },
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
