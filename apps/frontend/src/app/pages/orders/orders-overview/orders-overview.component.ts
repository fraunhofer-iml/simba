import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { OrderDto } from 'libs/api/src/dtos/order/order.dto';


@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrl: './orders-overview.component.scss'
})
export class OrdersOverviewComponent {
  displayedColumns: string[] = ["orderId","date","status","price","products","robots","customerID"];
  dataSource = new MatTableDataSource<OrderDto>;
  dataSourceObservable: Observable<MatTableDataSource<OrderDto>>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router:Router, orderService:OrdersService) {
    this.dataSource = new MatTableDataSource<OrderDto>()
    this.dataSourceObservable = orderService.getOrders().pipe(map( (orders) => {
      const dataSource = this.dataSource;
      dataSource.data = orders;
      return dataSource;
    }));
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
