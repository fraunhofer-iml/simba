import { TranslateService } from '@ngx-translate/core';
import { map, Observable, Subscription } from 'rxjs';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderOverview } from '../../../model/orderOverview';
import { ROUTING } from '../../../routing/routing.enum';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { DateFormatService } from '../../../shared/services/util/date-format.service';
import { OrderOverviewDto } from '@ap3/api';

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
    'currency',
    'products',
    'amount',
    'robots',
    'customerName',
  ];
  displayedColumnsCustomer: string[] = ['orderId', 'status', 'productionDate', 'price', 'currency', 'products', 'amount', 'customerName'];
  dataSource = new MatTableDataSource<OrderOverview>();
  dataSourceObservable: Observable<MatTableDataSource<OrderOverview>>;
  sort?: MatSort;
  translationStream: Subscription;
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
    private readonly authService: AuthService
  ) {
    this.isCustomer = authService.isCustomer();
    this.dataSourceObservable = this.orderService.getOrders().pipe(
      map((orders: OrderOverviewDto[]) => {
        return this.buildDatasourceOrders(orders);
      })
    );
    this.translationStream = translate.onLangChange.subscribe(() => {
      this.orderService.getOrders().subscribe((orders: OrderOverviewDto[]) => {
        this.buildDatasourceOrders(orders);
      });
    });
  }

  private buildDatasourceOrders(orders: OrderOverviewDto[]) {
    this.dataSource.data = OrderOverview.convertToOrderOverview(orders, this.dateFormatService, this.translate)
      .sort((a: OrderOverview, b: OrderOverview) => Number(b.id) - Number(a.id)).reverse();
    return this.dataSource;
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
}
