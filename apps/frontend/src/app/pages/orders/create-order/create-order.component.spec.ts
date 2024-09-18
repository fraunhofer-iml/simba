import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderComponent } from './create-order.component';
import { OffersService } from '../../../shared/services/offers/offers.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CountdownEvent, CountdownModule } from 'ngx-countdown';
import { Router } from '@angular/router';
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
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { CreateOrderDto, OrderDto, OrderMock, OrderOverviewDto, OrderOverviewMock } from '@ap3/api';
import { of, throwError } from 'rxjs';

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;
  let orderService: OrdersService;
  let offerService: OffersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOrderComponent],
      imports: [
        MatDividerModule,
        CountdownModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        MatNativeDateModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        NoopAnimationsModule,
      ],
      providers: [
        OffersService,
        OrdersService,
        HttpClient,
        HttpHandler,
        Router
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrdersService);
    offerService = TestBed.inject(OffersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call declineAllOffers when countdown reaches zero', () => {
    const event: CountdownEvent = { left: 0 } as CountdownEvent;
    jest.spyOn(component, 'declineAllOffers');
    component.onEvent(event);
    expect(component.declineAllOffers).toHaveBeenCalled();
  });

  it('should handle successful order creation', () => {
    let createOrderFrontendDto: CreateOrderDto = {
      productId: component.orderForm.get("product")?.value.id,
      amount: component.orderForm.get("amount")?.value,
      dueMonth: component.orderForm.get("calendarMonth")?.value,
      customerId: "pt0001",
    }

    jest.spyOn(orderService, 'createOrder').mockReturnValue(of(OrderOverviewMock[0]));
    jest.spyOn(offerService, 'getOffersByOrderId').mockReturnValue(of([]));

    component.createHardware();
    expect(orderService.createOrder).toHaveBeenCalledWith(createOrderFrontendDto);
    expect(offerService.getOffersByOrderId).toHaveBeenCalledWith(OrderOverviewMock[0].id);
    expect(component.openOffers).toBe(true);
  });

  it('should handle error in order creation', () => {
    jest.spyOn(orderService, 'createOrder').mockReturnValue(throwError(() => new Error('Error')));
    jest.spyOn(offerService, 'getOffersByOrderId');

    component.createHardware();
    expect(orderService.createOrder).toHaveBeenCalled();
    expect(offerService.getOffersByOrderId).not.toHaveBeenCalled();
    expect(component.openOffers).toBe(false);
  });
});
