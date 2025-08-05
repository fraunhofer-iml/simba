/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreateOrderDto, OfferDto, OrderOverviewDto, ProductDto } from '@ap3/api';
import { UNITS } from '@ap3/util';
import { TranslateService } from '@ngx-translate/core';
import { Chart, ChartDataset, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import _moment, { default as _rollupMoment, Moment } from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { CountdownEvent } from 'ngx-countdown';
import { catchError, Observable, of } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogOffersExpiredComponent } from '../../../layout/dialog-offers-expired/dialog-offers-expired.component';
import { ROUTING } from '../../../routing/routing.enum';
import { OffersService } from '../../../shared/services/offers/offers.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { CalendarWeekService } from '../../../shared/services/util/calendar-week.service';
import { FormatService } from '../../../shared/services/util/format.service';
import { countdownConfig } from './config/countdown.config';
import { CreateOrderUtils } from './create-order.util';
import { OfferPricingStatistic } from './model/offer-pricing-statistics';

const moment = _rollupMoment || _moment;
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent implements OnInit {
  public barChartOptions: ChartOptions | undefined;
  public barChartLabels: string[] = [];
  public barChartLegend = true;
  public barChartPlugins = [ChartDataLabels];
  public barChartData: ChartDataset<'bar'>[] = [];

  private baseWeek = 0;
  private offerPricingStatistic!: OfferPricingStatistic;

  private readonly basicPrice: number[] = [];
  private readonly utilization: number[] = [];
  private readonly timeUntilOrderBegins: number[] = [];
  protected readonly countdownConfig = countdownConfig;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  datePickerFilter = (d: Moment | null): boolean => {
    const year = (d || moment()).year();
    return year >= moment().year();
  };
  allCalendarWeeks: number[];
  orderForm: FormGroup;
  orderId: string;
  offers$: Observable<OfferDto[]> | undefined;
  openOffers = false;
  products$: Observable<ProductDto[]> | undefined;
  unitOfMeasurement: string | undefined;
  protected readonly UNITS = UNITS;

  constructor(
    public readonly formatService: FormatService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly builder: FormBuilder,
    private readonly orderService: OrdersService,
    private readonly translate: TranslateService,
    private readonly offerService: OffersService,
    private readonly productService: ProductService,
    private readonly calendarWeekService: CalendarWeekService
  ) {
    this.orderForm = builder.group({
      date: new FormControl<Moment | null>(null, Validators.required),
      product: new FormControl<string>('', Validators.required),
      amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
      selectedCalendarWeek: new FormControl<number | null>({ value: null, disabled: true }, Validators.required),
      unitOfMeasurement: new FormControl<string>('', Validators.required),
    });

    this.orderForm.get('selectedCalendarWeek')?.disable();
    this.orderId = '';
    this.products$ = this.productService.getProducts();
    this.allCalendarWeeks = [];
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.updatePagedChartData();
    });
  }

  setYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const dateValue = this.orderForm.get('date')?.value ?? moment();
    const selectedYear = normalizedMonthAndYear.year();
    dateValue.year(selectedYear);
    const lastCalendarWeek = this.calendarWeekService.getLastCalendarWeek(selectedYear);
    this.allCalendarWeeks = this.calendarWeekService.getCalendarWeeks(selectedYear, lastCalendarWeek);
    this.orderForm.get('date')?.setValue(dateValue);
    this.orderForm.get('selectedCalendarWeek')?.enable();
    this.orderForm.get('selectedCalendarWeek')?.reset();
    datepicker.close();
  }

  createOrder() {
    const createOrderDto = <CreateOrderDto>{
      productId: this.orderForm.get('product')?.value.id,
      amount: this.orderForm.get('amount')?.value,
      year: this.orderForm.get('date')?.value.year(),
      calendarWeek: this.orderForm.get('selectedCalendarWeek')?.value,
      customerId: '',
      unitOfMeasureCode: this.orderForm.get('unitOfMeasurement')?.value,
    };
    this.orderService
      .createOrder(createOrderDto)
      .pipe(
        catchError(() => {
          return of(null);
        })
      )
      .subscribe((order: OrderOverviewDto | null) => {
        if (order) {
          this.orderId = order.id;
          this.openOffers = true;
          this.orderForm.disable();

          this.offers$ = this.offerService.getOffersByOrderId(order.id);
          this.offers$.subscribe((offers: OfferDto[]) => {
            offers.forEach((offer: OfferDto) => {
              this.basicPrice.push(offer.basicPrice);
              this.timeUntilOrderBegins.push(offer.timeUntilProduction);
              this.utilization.push(offer.utilization);
            });

            this.offerPricingStatistic = {
              timeUntilOrderBegins: this.timeUntilOrderBegins,
              basePrice: this.basicPrice,
              utilization: this.utilization,
            };

            this.baseWeek = this.orderForm.get('selectedCalendarWeek')?.value;
            this.updatePagedChartData();
          });
        }
      });
  }

  onEvent($event: CountdownEvent) {
    if ($event.left === 0) {
      this.declineAllOffers();
      this.showDialog();
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
      this.offerService.declineAllOffersByOrderId(this.orderId).subscribe();
    } else {
      throw new Error('No OrderId available');
    }
  }

  navigateToOrders() {
    this.router.navigate([ROUTING.orders]);
  }

  getScheduledFor(cw: number, year: number) {
    return `${this.translate.instant('CalendarWeek')} ${cw}, ${year}`;
  }

  private showDialog() {
    const dialogRef = this.dialog.open(DialogOffersExpiredComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.openOffers = false;
      this.orderForm.enable();
    });
  }

  private updatePagedChartData() {
    this.barChartOptions = CreateOrderUtils.buildBarChartOptions(this.translate);
    this.barChartData = CreateOrderUtils.buildChartData(this.translate, this.offerPricingStatistic);
    this.barChartLabels = CreateOrderUtils.buildChartLabels(this.translate, this.baseWeek);
    this.chart?.update();
  }
}
