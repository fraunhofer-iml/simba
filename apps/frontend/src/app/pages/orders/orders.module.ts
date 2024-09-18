import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CreateOrderComponent } from './create-order/create-order.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersOverviewComponent } from './orders-overview/orders-overview.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersService } from '../../shared/services/orders/orders.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { OffersService } from '../../shared/services/offers/offers.service';
import { CountdownComponent } from 'ngx-countdown';
import { ProductService } from '../../shared/services/product/product.service';


@NgModule({
  declarations: [OrdersOverviewComponent, CreateOrderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    OrdersRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    CountdownComponent,
  ],
  providers: [OffersService, OrdersService, provideHttpClient(), ProductService],
})
export class OrdersModule {}
