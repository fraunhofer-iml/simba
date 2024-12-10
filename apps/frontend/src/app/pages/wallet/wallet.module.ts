import { TranslateModule } from '@ngx-translate/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CommonModule, DatePipe } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DateFormatService } from '../../shared/formats/date-format.service';
import { InvoiceService } from '../../shared/services/invoices/invoices.service';
import { TradeReceivableService } from '../../shared/services/trade-receivable/trade-receivable.service';
import { PaidStatisticsComponent } from './paid-statistics/paid-statistics.component';
import { UnpaidStatisticsComponent } from './unpaid-statistics/unpaid-statistics.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { DownloadInvoiceDialogComponent } from './download-invoice-dialog/download-invoice-dialog.component';

@NgModule({

  declarations: [WalletComponent, PaidStatisticsComponent, UnpaidStatisticsComponent, DownloadInvoiceDialogComponent],
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
    WalletRoutingModule,
    MatGridListModule,
    TranslateModule,
    MatCheckbox,
    MatButton,
    BaseChartDirective,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideCharts(withDefaultRegisterables()),
    InvoiceService,
    TradeReceivableService,
    DateFormatService,
    DatePipe,
  ],
})
export class WalletModule {}
