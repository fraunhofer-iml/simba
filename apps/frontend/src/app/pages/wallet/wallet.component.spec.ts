import { TranslateModule } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { InvoiceService } from '../../shared/services/invoice/invoice.service';
import { WalletComponent } from './wallet.component';
import { InvoiceDto, InvoiceMocks } from '@ap3/api';
import { SelectionModel } from '@angular/cdk/collections';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [InvoiceService, AuthService, KeycloakService],
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
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [WalletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletComponent);
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
    const mockData: InvoiceDto[] = InvoiceMocks;
    component.dataSource = new MatTableDataSource(mockData);
    component.selection = new SelectionModel<InvoiceDto>(true, []);
    expect(component.selection.selected.length).toBe(0);
    component.toggleSelectionForAllRows();
    expect(component.selection.selected.length).toBe(mockData.length);
    component.toggleSelectionForAllRows();
    expect(component.selection.selected.length).toBe(0);
  });
});
