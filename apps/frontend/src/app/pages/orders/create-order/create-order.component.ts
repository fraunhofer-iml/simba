/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreateOrderDto, OfferDto, OrderOverviewDto, ProductDto, RequestNewOffersDto } from '@ap3/api';
import { UNITS } from '@ap3/util';
import { TranslateService } from '@ngx-translate/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getWeek, getYear } from 'date-fns';
import { debounce } from 'lodash';
import { BaseChartDirective } from 'ng2-charts';
import { CountdownComponent } from 'ngx-countdown';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ROUTING } from '../../../routing/routing.enum';
import { OffersService } from '../../../shared/services/offers/offers.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { CalendarWeekService } from '../../../shared/services/util/calendar-week.service';
import { FormatService } from '../../../shared/services/util/format.service';
import { CreateOrderUtils } from './create-order.util';
import { CreateOrderChartEntity } from './model/create-order-chart.entity';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent implements OnInit {
  protected readonly weekShift = 4;
  protected readonly UNITS = UNITS;
  orderForm: FormGroup<{
    date: FormControl<Date | null>;
    product: FormControl<ProductDto | null>;
    amount: FormControl<number | null>;
    selectedCalendarWeek: FormControl<number | null>;
    unitOfMeasurement: FormControl<string | null>;
  }>;
  offers$: Observable<OfferDto[]> | undefined;
  products$: Observable<ProductDto[]> | undefined;

  offers: OfferDto[] = [];
  baseChartConfig!: CreateOrderChartEntity;

  allCalendarWeeks: number[];
  tmpOrderInfo: RequestNewOffersDto;
  datePickerFilter = (d: Date | null): boolean => getYear(d ?? new Date()) >= getYear(new Date());

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('cd', { static: false }) countdown!: CountdownComponent;

  constructor(
    public readonly formatService: FormatService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly orderService: OrdersService,
    private readonly translateService: TranslateService,
    private readonly offerService: OffersService,
    private readonly productService: ProductService,
    private readonly calendarWeekService: CalendarWeekService
  ) {
    this.orderForm = new FormGroup({
      date: new FormControl<Date | null>(null, Validators.required),
      product: new FormControl<ProductDto | null>(null, Validators.required),
      amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      selectedCalendarWeek: new FormControl<number | null>({ value: null, disabled: true }, Validators.required),
      unitOfMeasurement: new FormControl<string>('', Validators.required),
    });

    this.tmpOrderInfo = { orderId: '', cw: 0, year: 0 };
    this.allCalendarWeeks = [];
    this.products$ = this.productService.getProducts().pipe(
      catchError((err) => {
        this.onError(this.translateService.instant('Error.GetProductsFailed'));
        return throwError(() => err);
      })
    );
  }

  ngOnInit() {
    this.translateService.onLangChange.subscribe(() => {
      this.updatePagedChartData(this.offers);
    });
    this.baseChartConfig = {
      legend: true,
      labels: [],
      unitOfMeasurement: undefined,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
      },
      plugins: [ChartDataLabels],
      data: [],
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize = debounce(() => {
    if (this.chart) this.chart.render();
  }, 200);

  createOrder() {
    this.tmpOrderInfo.cw = this.orderForm.value.selectedCalendarWeek ?? 0;
    const createOrderDto = <CreateOrderDto>{
      productId: this.orderForm.value.product?.id,
      amount: this.orderForm.value.amount,
      year: getYear(this.orderForm.value.date ?? new Date()),
      calendarWeek: this.orderForm.value.selectedCalendarWeek,
      unitOfMeasureCode: this.orderForm.value.unitOfMeasurement,
    };
    this.offers$ = this.orderService.createOrder(createOrderDto).pipe(
      catchError((err) => {
        this.onError(this.translateService.instant('Error.OrderCreationFailed'));
        return throwError(() => err);
      }),
      switchMap((order: OrderOverviewDto) => {
        this.tmpOrderInfo.orderId = order.id;
        return this.offerService.generateNewOffers(this.tmpOrderInfo).pipe(
          catchError((err) => {
            this.onError(this.translateService.instant('Error.OfferGenerationFailed'));
            return throwError(() => err);
          })
        );
      }),
      tap((offers: OfferDto[]) => {
        if (offers) {
          this.offers = offers;
          this.orderForm.disable();
          this.updatePagedChartData(offers);
        }
        return offers;
      })
    );
  }

  setYear(normalizedMonthAndYear: Date, datepicker: MatDatepicker<Date>) {
    this.tmpOrderInfo.year = getYear(normalizedMonthAndYear);
    this.allCalendarWeeks = this.calendarWeekService.getCalendarWeeks(this.tmpOrderInfo.year);
    this.orderForm.patchValue({ date: normalizedMonthAndYear, selectedCalendarWeek: null });
    this.orderForm.get('selectedCalendarWeek')?.enable();
    this.orderForm.get('selectedCalendarWeek')?.reset();
    datepicker.close();
  }

  isCurrentOrPastWeek(week: number, year: number): boolean {
    const currentYear = getYear(new Date());
    const currentWeek = getWeek(new Date());
    return year < currentYear || (year === currentYear && week <= currentWeek);
  }

  acceptOffer(offerId: string) {
    this.offerService
      .acceptOffer(offerId)
      .pipe(
        catchError((err: Error) => {
          this.onError('Error.OfferAcceptationFailed');
          return throwError(() => err);
        })
      )
      .subscribe(() => {
        this.navigateToOrders();
      });
  }

  declineAllOffers() {
    this.offerService.declineAllOffersByOrderId(this.tmpOrderInfo.orderId).pipe(
        catchError((err) => {
          this.onError('Error.OfferDeclineFailed');
          return throwError(() => err)
        })
      ).subscribe(() => this.navigateToOrders());
  }

  navigateToOrders() {
    this.router.navigate([ROUTING.orders]);
  }

  getScheduledFor(cw: number, year: number) {
    return `${this.translateService.instant('CalendarWeek')} ${cw}, ${year}`;
  }

  offersForPreviousWeeks() {
    let newOfferWeek = this.tmpOrderInfo.cw - this.weekShift;
    if (newOfferWeek < 1) {
      this.tmpOrderInfo.year--;
      newOfferWeek = this.calendarWeekService.getLastCalendarWeek(this.tmpOrderInfo.year) + newOfferWeek;
    }
    if (this.isCurrentOrPastWeek(newOfferWeek, this.tmpOrderInfo.year)) {
      this.tmpOrderInfo.cw = getWeek(new Date()) + 1;
      this.tmpOrderInfo.year = getYear(new Date());
    } else {
      this.tmpOrderInfo.cw = newOfferWeek;
    }
    this.loadOffersForOrderWeek();
  }

  offersForNextWeeks() {
    const maxWeeksOfYear = this.calendarWeekService.getLastCalendarWeek(this.tmpOrderInfo.year);
    if (this.tmpOrderInfo.cw + this.weekShift > maxWeeksOfYear) {
      this.tmpOrderInfo.cw = this.tmpOrderInfo.cw + this.weekShift - maxWeeksOfYear;
      this.tmpOrderInfo.year++;
    } else {
      this.tmpOrderInfo.cw += this.weekShift;
    }
    this.loadOffersForOrderWeek();
  }

  private loadOffersForOrderWeek() {
    this.offers$ = this.offerService.generateNewOffers(this.tmpOrderInfo).pipe(
      catchError((err: Error) => {
        this.onError('Error.OfferGenerationFailed');
        return throwError(() => err);
      }),
      tap((offers: OfferDto[]) => {
        this.countdown.restart();
        this.updatePagedChartData(offers);
      })
    );
  }

  private updatePagedChartData(offers: OfferDto[]) {
    this.baseChartConfig.options = CreateOrderUtils.buildBarChartOptions(this.formatService);
    this.baseChartConfig.data = CreateOrderUtils.buildChartData(this.translateService, offers);
    this.baseChartConfig.labels = CreateOrderUtils.buildChartLabels(
      this.translateService,
      offers[0].plannedCalendarWeek,
      offers.flatMap((offer: OfferDto) => {
        return offer.plannedCalendarWeek;
      })
    );
    this.chart?.update();
  }

  private onError(msg: string) {
    this.snackBar.open(this.translateService.instant(msg), this.translateService.instant('CloseSnackBarAction'));
  }
}
