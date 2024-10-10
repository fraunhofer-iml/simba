import { CreateOrderDto, OrderOverviewMock } from '@ap3/api';
import { TranslateModule } from '@ngx-translate/core';
import { CountdownEvent, CountdownModule } from 'ngx-countdown';
import { of, throwError } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { OffersService } from '../../../shared/services/offers/offers.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { CreateOrderComponent } from './create-order.component';

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
        TranslateModule.forRoot(),
      ],
      providers: [OffersService, OrdersService, ProductService, HttpClient, HttpHandler, Router],
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
    component.orderId = '123';
    const event: CountdownEvent = { left: 0 } as CountdownEvent;
    jest.spyOn(component, 'declineAllOffers');
    component.onEvent(event);
    expect(component.declineAllOffers).toHaveBeenCalled();
  });

  it('should handle successful order creation', () => {
    let createOrderFrontendDto: CreateOrderDto = {
      productId: component.orderForm.get('product')?.value.id,
      amount: component.orderForm.get('amount')?.value,
      dueMonth: component.orderForm.get('calendarMonth')?.value,
      customerId: 'pt0001',
    };

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
