import { TranslateModule } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CompaniesService } from '../../../shared/services/companies/companies.service';
import { InvoiceFilterService } from '../../../shared/services/invoices/filter/invoice-filter.service';
import { InvoiceFilterComponent } from './invoice-filter.component';

describe('FilterDialogComponent', () => {
  let component: InvoiceFilterComponent;
  let fixture: ComponentFixture<InvoiceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatCheckboxModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [InvoiceFilterComponent],
      providers: [
        InvoiceFilterService,
        CompaniesService,
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideHttpClientTesting(),
        AuthService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
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

    fixture = TestBed.createComponent(InvoiceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
