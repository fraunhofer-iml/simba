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
import { UserRoles } from '@ap3/util';
import { of } from 'rxjs';
import { CompanyDtoMock } from '@ap3/api';

describe('InvoiceFilterComponent', () => {
  let component: InvoiceFilterComponent;
  let fixture: ComponentFixture<InvoiceFilterComponent>;
  let mockCompaniesService: Partial<CompaniesService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockCompaniesService = {
      getAllAvailableCompanies: jest.fn().mockReturnValue(of(CompanyDtoMock)),
    };

    mockAuthService = {
      getCurrentlyLoggedInUserRole: jest.fn().mockReturnValue(UserRoles.CUSTOMER),
      getCurrentlyLoggedInCompanyId: jest.fn().mockReturnValue('1'),
    };

    await TestBed.configureTestingModule({
      declarations: [InvoiceFilterComponent],
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
      providers: [
        InvoiceFilterService,
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideHttpClientTesting(),
        { provide: CompaniesService, useValue: mockCompaniesService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setFormGroupWithStaticFilterValues and populate form', () => {
    component.filter = {
      dueDateFrom: new Date('2022-01-01'),
      dueDateTo: new Date('2022-12-31'),
      paymentStates: ['PAID'],
    };

    component.setFormGroupWithStaticFilterValues();

    expect(component.filterFormGroup.get('dateRange.start')?.value).toEqual(new Date('2022-01-01'));
    expect(component.filterFormGroup.get('dateRange.end')?.value).toEqual(new Date('2022-12-31'));
    expect(component.filterFormGroup.get('selectedFinancialStates')?.value).toEqual(['PAID']);
  });

  it('should set filter correctly', () => {
    component.filterFormGroup.get('selectedFinancialStates')?.setValue(['OPEN']);
    component.filterFormGroup.get('dateRange.start')?.setValue(new Date('2023-01-01'));
    component.filterFormGroup.get('dateRange.end')?.setValue(new Date('2023-12-31'));

    component.setFilter();

    expect(component.filter).toEqual({
      creditorId: "",
      debtorId : "",
      paymentStates: ['OPEN'],
      dueDateFrom: new Date('2023-01-01'),
      dueDateTo: new Date('2023-12-31'),
    });
  });

  it('should update selectedFinancialStates correctly on checkbox change', () => {
    component.filterFormGroup.get('selectedFinancialStates')?.setValue(['OPEN']);
    component.onCheckBoxChange('PAID');

    expect(component.filterFormGroup.get('selectedFinancialStates')?.value).toEqual(['OPEN', 'PAID']);

    component.onCheckBoxChange('OPEN');
    expect(component.filterFormGroup.get('selectedFinancialStates')?.value).toEqual(['PAID']);
  });

  it('should correctly check isCheckBoxChecked state', () => {
    component.filterFormGroup.get('selectedFinancialStates')?.setValue(['OPEN', 'PAID']);
    expect(component.isCheckBoxChecked('OPEN')).toBe(true);
    expect(component.isCheckBoxChecked('CLOSED')).toBe(false);
  });
});
