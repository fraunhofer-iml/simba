/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreateOrderDto, orderOverviewMock } from '@ap3/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { CountdownEvent, CountdownModule } from 'ngx-countdown';
import { of, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
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
import { OrderFilter } from '../../../model/order-filter';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { OffersService } from '../../../shared/services/offers/offers.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { CalendarWeekService } from '../../../shared/services/util/calendar-week.service';
import { FormatService } from '../../../shared/services/util/format.service';
import { CreateOrderComponent } from './create-order.component';
import {getYear} from "date-fns";

jest.mock('ng2-charts', () => ({
  BaseChartDirective: jest.fn().mockImplementation(() => ({
    ngOnInit: jest.fn(),
    ngOnChanges: jest.fn(),
    update: jest.fn(),
  })),
}));

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;
  let orderService: OrdersService;
  let offerService: OffersService;
  let datepicker: MatDatepicker<Date>;
  let mockOfferService: jest.Mocked<OffersService>;

  beforeEach(async () => {
    datepicker = {
      close: jest.fn(),
    } as unknown as MatDatepicker<Date>;

    mockOfferService = {
      generateNewOffers: jest.fn()
    } as unknown as jest.Mocked<OffersService>;

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
        KeycloakAngularModule,
      ],
      providers: [
        FilterService<OrderFilter>,
        OffersService,
        OrdersService,
        ProductService,
        HttpClient,
        HttpHandler,
        Router,
        CalendarWeekService,
        TranslateService,
        DatePipe,
        FormatService,
        AuthService,
        {
          provide: KeycloakService,
          useValue: {
            getKeycloakInstance: jest.fn().mockReturnValue({
              profile: {
                attributes: {
                  company: ['pt0001'],
                },
              },
            }),
            getUserRoles: jest.fn().mockReturnValue([]),
          },
        },
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
    component.tmpOrderInfo.orderId = '123';
    const event: CountdownEvent = { left: 0 } as CountdownEvent;
    jest.spyOn(component, 'declineAllOffers');
    component.onEvent(event);
    expect(component.declineAllOffers).toHaveBeenCalled();
  });

  it('should handle successful order creation', () => {
    component.orderForm.get('date')?.setValue(new Date());
    component.orderForm.get('product')?.setValue({id:'12345', name:"prod"});
    component.orderForm.get('selectedCalendarWeek')?.setValue(2);
    component.orderForm.get('amount')?.setValue(4);

    const createOrderFrontendDto = <CreateOrderDto>{
      productId: component.orderForm.value.product?.id,
      amount: component.orderForm.value.amount,
      year: getYear(component.orderForm.value.date ?? new Date()),
      calendarWeek: component.orderForm.value.selectedCalendarWeek,
      unitOfMeasureCode: '',
    };

    jest.spyOn(orderService, 'createOrder').mockReturnValue(of(orderOverviewMock[0]));
    jest.spyOn(offerService, 'generateNewOffers').mockReturnValue(of([]));

    component.createOrder();
    expect(orderService.createOrder).toHaveBeenCalledWith(createOrderFrontendDto);
  });

  it('should handle error in order creation', () => {
    component.orderForm.get('date')?.setValue(new Date());
    jest.spyOn(orderService, 'createOrder').mockReturnValue(throwError(() => new Error('Error')));
    jest.spyOn(offerService, 'generateNewOffers');

    component.createOrder();
    expect(orderService.createOrder).toHaveBeenCalled();
    expect(offerService.generateNewOffers).not.toHaveBeenCalled();
  });

  it('should set the year of the date value', () => {
    const normalizedDate = new Date('2025-01-01');
    const initialDate = new Date('2020-01-01');
    component.orderForm.get('date')?.setValue(initialDate);

    component.setYear(normalizedDate, datepicker);

    const date = component.orderForm.value.date as Date;
    expect(date.getFullYear()).toBe(2025);
  });
});
