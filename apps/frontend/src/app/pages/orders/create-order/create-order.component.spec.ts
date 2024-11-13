import { CreateOrderDto, OrderOverviewMock } from '@ap3/api';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';
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
import { DialogOffersExpiredComponent } from '../../../layout/dialog-offers-expired/dialog-offers-expired.component';
import { OffersService } from '../../../shared/services/offers/offers.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { CalendarWeekService } from '../../../shared/services/util/calendar-week.service';
import { CreateOrderComponent } from './create-order.component';

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;
  let orderService: OrdersService;
  let offerService: OffersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOrderComponent, DialogOffersExpiredComponent],
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
      providers: [OffersService, OrdersService, ProductService, HttpClient, HttpHandler, Router, CalendarWeekService],
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
    component.orderForm.get('date')?.setValue(moment());
    component.orderForm.get('product')?.setValue('12345');
    component.orderForm.get('selectedCalendarWeek')?.setValue(2);
    component.orderForm.get('amount')?.setValue(4);

    const createOrderFrontendDto: CreateOrderDto = {
      productId: component.orderForm.get('product')?.value.id,
      amount: component.orderForm.get('amount')?.value,
      year: component.orderForm.get('date')?.value.year(),
      calendarWeek: component.orderForm.get('selectedCalendarWeek')?.value,
      customerId: 'pt0001',
    };

    jest.spyOn(orderService, 'createOrder').mockReturnValue(of(OrderOverviewMock[0]));
    jest.spyOn(offerService, 'getOffersByOrderId').mockReturnValue(of([]));

    component.createOrder();
    expect(orderService.createOrder).toHaveBeenCalledWith(createOrderFrontendDto);
    expect(offerService.getOffersByOrderId).toHaveBeenCalledWith(OrderOverviewMock[0].id);
    expect(component.openOffers).toBe(true);
  });

  it('should handle error in order creation', () => {
    component.orderForm.get('date')?.setValue(moment());
    jest.spyOn(orderService, 'createOrder').mockReturnValue(throwError(() => new Error('Error')));
    jest.spyOn(offerService, 'getOffersByOrderId');

    component.createOrder();
    expect(orderService.createOrder).toHaveBeenCalled();
    expect(offerService.getOffersByOrderId).not.toHaveBeenCalled();
    expect(component.openOffers).toBe(false);
  });
});
