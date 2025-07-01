import { TranslateModule } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Invoice } from '../../../model/invoice';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FormatService } from '../../../shared/services/util/format.service';
import { InvoiceTableComponent } from './invoice-table.component';

describe('InvoiceTableComponent', () => {
  let component: InvoiceTableComponent;
  let fixture: ComponentFixture<InvoiceTableComponent>;

  const mockDialog = {
    open: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatCheckboxModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [InvoiceTableComponent],
      providers: [
        FormatService,
        DatePipe,
        AuthService,
        { provide: MatDialog, useValue: mockDialog },
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

    fixture = TestBed.createComponent(InvoiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle rows selection', () => {
    component.selection = new SelectionModel<Invoice>(true, []);
    expect(component.selection.selected.length).toBe(0);
  });

  it('should open token dialog', () => {
    component.openTokenDetailsDialog('INV-001');
    expect(mockDialog.open).toHaveBeenCalled();
  });
});
