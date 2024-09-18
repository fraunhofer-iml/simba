import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDto } from 'libs/api/src/dtos/product/product.dto';
import { ProductMocks } from 'libs/api/src/dtos/product/mocks/product.mock';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { CreateOrderDto, OfferDto, OrderOverviewDto } from '@ap3/api';
import { OffersService } from '../../../shared/services/offers/offers.service';
import { Router } from '@angular/router';
import { CountdownEvent } from 'ngx-countdown';
import { Countdown } from './model/countdown';
import { environment } from '../../../../environments/environment';
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent {
  orderForm: FormGroup;
  offers$: Observable<OfferDto[]> | undefined;
  openOffers = false;
  products$: Observable<ProductDto[]> | undefined;
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
    private router: Router,
    private productService : ProductService
  ) {
    this.orderForm = builder.group({
      product:['',[Validators.required]],
      amount: [0,[Validators.required]],
      calendarMonth: ['',[Validators.required]]
    });

    this.products$ = this.productService.getProducts();

  }

  createHardware() {
    let createOrderdDto : CreateOrderDto = {
      productId: this.orderForm.get("product")?.value.id,
      amount: this.orderForm.get("amount")?.value,
      dueMonth: this.orderForm.get("calendarMonth")?.value,
      customerId: "pt0001"
    }

    this.orderService.createOrder(createOrderdDto).pipe(
      catchError(() => {
        return of(null);
      })
    ).subscribe((order: OrderOverviewDto | null) => {
      if (order) {
        console.log(order);
        this.offers$ = this.offerService.getOffersByOrderId(order.id);
        console.log(this.offers$);
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
      map(offers => offers.map(offer => offer.id)),
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
