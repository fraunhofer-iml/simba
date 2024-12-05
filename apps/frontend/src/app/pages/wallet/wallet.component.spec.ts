import { InvoiceDto, InvoiceMocks } from '@ap3/api';
import { TranslateModule } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { SelectionModel } from '@angular/cdk/collections';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { InvoiceService } from '../../shared/services/invoices/invoices.service';
import { TradeReceivableService } from '../../shared/services/trade-receivable/trade-receivable.service';
import { PaidStatisticsComponent } from './paid-statistics/paid-statistics.component';
import { UnpaidStatisticsComponent } from './unpaid-statistics/unpaid-statistics.component';
import { WalletComponent } from './wallet.component';

jest.mock('ng2-charts', () => ({
  BaseChartDirective: jest.fn().mockImplementation(() => ({
    ngOnInit: jest.fn(),
    ngOnChanges: jest.fn(),
    update: jest.fn(),
  })),
}));
describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [InvoiceService, AuthService, KeycloakService, InvoiceService, provideHttpClient(), TradeReceivableService],
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
        TranslateModule.forRoot(),
      ],
      declarations: [WalletComponent, UnpaidStatisticsComponent, PaidStatisticsComponent],
      schemas: [NO_ERRORS_SCHEMA], // From PaidStatistics spec
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
