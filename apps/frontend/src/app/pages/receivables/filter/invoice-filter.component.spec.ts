import { companyDtoMock } from '@ap3/api';
import { UserRoles } from '@ap3/util';
import { TranslateModule } from '@ngx-translate/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs';
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
import { InvoiceFilter } from '../../../model/invoice-filter';
import { AutocompleteCompanyFilterComponent } from '../../../shared/components/filter/autocomplete-company-filter/autocomplete-company-filter.component';
import { CheckboxFilterComponent } from '../../../shared/components/filter/checkbox-filter/checkbox-filter.component';
import { DateRangeFilterComponent } from '../../../shared/components/filter/date-range-filter/date-range-filter.component';
import { FilterModule } from '../../../shared/components/filter/filter.module';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CompaniesService } from '../../../shared/services/companies/companies.service';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { InvoiceFilterComponent } from './invoice-filter.component';
import { MatIconModule } from '@angular/material/icon';

describe('InvoiceFilterComponent', () => {
  let component: InvoiceFilterComponent;
  let fixture: ComponentFixture<InvoiceFilterComponent>;
  let mockCompaniesService: Partial<CompaniesService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockCompaniesService = {
      getAllAvailableCompanies: jest.fn().mockReturnValue(of(companyDtoMock)),
    };

    mockAuthService = {
      getCurrentlyLoggedInUserRole: jest.fn().mockReturnValue(UserRoles.CUSTOMER),
      getCurrentlyLoggedInCompanyId: jest.fn().mockReturnValue('1'),
    };

    await TestBed.configureTestingModule({
      imports: [
        KeycloakAngularModule,
        FilterModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatCheckboxModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        MatIconModule
      ],
      providers: [
        FilterService<InvoiceFilter>,
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
      declarations: [InvoiceFilterComponent, AutocompleteCompanyFilterComponent, CheckboxFilterComponent, DateRangeFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
