import { CreateOrderDto, OfferDto, OrderOverviewDto, ProductDto } from '@ap3/api';
import { CountdownEvent } from 'ngx-countdown';
import { catchError, Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTING } from '../../../routing/routing.enum';
import { OffersService } from '../../../shared/services/offers/offers.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { Countdown } from './model/countdown';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent {
  orderForm: FormGroup;
  orderId: string;
  offers$: Observable<OfferDto[]> | undefined;
  openOffers = false;
  products$: Observable<ProductDto[]> | undefined;
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  countdownConfig: Countdown = {
    leftTime: 60,
    format: 'mm:ss',
  };

  constructor(
    private orderService: OrdersService,
    private builder: FormBuilder,
    private offerService: OffersService,
    private router: Router,
    private productService: ProductService
  ) {
    this.orderForm = builder.group({
      product: ['', [Validators.required]],
      amount: [null, [Validators.required]],
      calendarMonth: ['', [Validators.required]],
    });
    this.orderId = '';
    this.products$ = this.productService.getProducts();
  }

  createHardware() {
    const createOrderdDto: CreateOrderDto = {
      productId: this.orderForm.get('product')?.value.id,
      amount: this.orderForm.get('amount')?.value,
      dueMonth: this.orderForm.get('calendarMonth')?.value,
      customerId: 'pt0001',
    };

    this.orderService
      .createOrder(createOrderdDto)
      .pipe(
        catchError(() => {
          return of(null);
        })
      )
      .subscribe((order: OrderOverviewDto | null) => {
        if (order) {
          this.orderId = order.id;
          this.offers$ = this.offerService.getOffersByOrderId(order.id);
          this.openOffers = true;
          this.orderForm.disable();
        }
      });
  }

  onEvent($event: CountdownEvent) {
    if ($event.left === 0) {
      this.declineAllOffers();
    }
  }

  acceptOffer(offerId: string) {
    this.offerService
      .acceptOffer(offerId)
      .pipe(
        catchError(() => {
          return of(null);
        })
      )
      .subscribe(() => {
        this.navigateToOrders();
      });
  }

  declineAllOffers() {
    if (this.orderId) {
      this.offerService.declineAllOffersByOrderId(this.orderId).subscribe((res) => this.navigateToOrders());
    } else {
      throw new Error('No OrderId available');
    }
  }

  private navigateToOrders() {
    this.router.navigate([ROUTING.orders]);
  }
}
