import { OrderOverviewDto } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ROUTING } from '../../../routing/routing.enum';
import { DateFormatService } from '../../../shared/formats/date-format.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { OrderStatus } from './enum/orderStatus';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrl: './orders-overview.component.scss',
})
export class OrdersOverviewComponent implements AfterViewInit {
  isCustomer: boolean;
  displayedColumnsAdminContributor: string[] = [
    'orderId',
    'status',
    'productionDate',
    'price',
    'products',
    'amount',
    'robots',
    'customerID',
  ];
  displayedColumnsCustomer: string[] = ['orderId', 'status', 'productionDate', 'price', 'products', 'amount', 'customerID'];
  dataSource = new MatTableDataSource<OrderOverviewDto>();
  dataSourceObservable: Observable<MatTableDataSource<OrderOverviewDto>>;
  sort?: MatSort;
  protected readonly ROUTING = ROUTING;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceSortAttribute();
  }

  constructor(
    private readonly orderService: OrdersService,
    private readonly translate: TranslateService,
    private readonly dateFormatService: DateFormatService,
    private readonly authService: AuthService,
    private readonly datePipe: DatePipe
  ) {
    this.isCustomer = authService.isCustomer();
    this.dataSourceObservable = this.orderService.getOrders().pipe(
      map((orders) => {
        this.dataSource.data = orders;
        this.dataSource.data.reverse();
        return this.dataSource;
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setDataSourceSortAttribute() {
    this.dataSource.sort = this.sort ?? null;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDateBasedOnStatus(order: OrderOverviewDto): string {
    if (order.status === OrderStatus.planned) {
      return `${this.translate.instant('CalendarWeek')} ${order.calendarWeek}`;
    } else {
      return this.dateFormatService.transformDateToCurrentLanguageFormat(order.statusTimestamp);
    }
  }
}
