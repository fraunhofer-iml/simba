import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { InvoiceService } from '../../shared/services/invoice/invoice.service';
import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';


@NgModule({
  declarations: [WalletComponent],
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
  ],
  providers: [InvoiceService, provideHttpClient(withInterceptorsFromDi())],
})
export class WalletModule {}
