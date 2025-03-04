import { TranslateModule } from '@ngx-translate/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { FileSaverModule } from 'ngx-filesaver';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../shared/services/auth/auth.service';
import { InvoiceService } from '../../shared/services/invoices/invoices.service';
import { DateFormatService } from '../../shared/services/util/date-format.service';
import { FinancialRoleService } from '../../shared/services/util/financial-role.service';
import { DownloadInvoiceDialogComponent } from './download-invoice-dialog/download-invoice-dialog.component';
import { PaidStatisticsComponent } from './paid-statistics/paid-statistics.component';
import { ReceivablesRoutingModule } from './receivables-routing.module';
import { ReceivablesComponent } from './receivables.component';
import { UnpaidStatisticsComponent } from './unpaid-statistics/unpaid-statistics.component';
import { TokenDetailsDialogComponent } from './token-details-dialog/token-details-dialog.component';

@NgModule({
  declarations: [ReceivablesComponent, PaidStatisticsComponent, UnpaidStatisticsComponent, DownloadInvoiceDialogComponent, TokenDetailsDialogComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    ReceivablesRoutingModule,
    MatGridListModule,
    TranslateModule,
    MatCheckbox,
    MatButton,
    BaseChartDirective,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    FileSaverModule,
    MatButtonToggleModule,
    MatListModule,
    MatTooltipModule,
    NgOptimizedImage,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideCharts(withDefaultRegisterables()),
    InvoiceService,
    DateFormatService,
    DatePipe,
    FinancialRoleService,
    AuthService,
  ],
})
export class ReceivablesModule {}
