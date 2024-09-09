import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductMocks } from 'libs/api/src/dtos/product/mocks/product.mock';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { CreateOrderDto, OfferDto, OrderDto, ProductDto } from '@ap3/api';
import { OffersService } from '../../../shared/services/offers/offers.service';
import { Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { Countdown } from './model/countdown';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent {
  orderForm: FormGroup;
  offers$: Observable<OfferDto[]> | undefined;
  openOffers = false;
  products: ProductDto[] = ProductMocks;
  months: string[] = ["January", "February", 'March',
    'April', 'May', 'June', 'July', 'August', 'September',
     'October', 'November', 'December'
    ]
  countdownConfig: Countdown = {
    leftTime: 60,
    format: 'mm:ss',
  };

  constructor(
    private orderService: OrdersService,
    private builder: FormBuilder,
    private offerService: OffersService,
    private router: Router
  ) {
    this.orderForm = builder.group({
      product:['',[Validators.required]],
      amount: [0,[Validators.required]],
      calendarWeek: ['',[Validators.required]]
    })
  }

  createHardware() {
    this.orderService.createOrder(this.orderForm.getRawValue() as CreateOrderDto).pipe(
      catchError(() => {
        return of(null);
      })
    ).subscribe((order: OrderDto | null) => {
      if (order) {
        this.offers$ = this.offerService.getOffersByOrderId(order.id);
        this.openOffers = true;
      }
    })
  }

  onEvent($event: CountdownEvent) {
    if ($event.left === 0) {
      this.declineAllOffers();
    }
  }

  acceptOffer(offerId: string) {
    this.offerService.acceptOffer(offerId).pipe(
        catchError(() => {
          return of(null);
        })
      ).subscribe(() => {
        this.navigateToOrders();
      });
  }

  declineAllOffers() {
    this.offers$?.pipe(
      map(offers => offers.map(offer => offer.orderId)),
      switchMap(orderIds =>
        forkJoin(orderIds.map(orderId =>
            this.offerService.declineAllOffersByOrderId(orderId)
          )
        )
      ),
    ).subscribe(() => {
      this.navigateToOrders();
    });
  }

  private navigateToOrders() {
    this.router.navigate([environment.ORDERS.ORDER]);
  }
}
