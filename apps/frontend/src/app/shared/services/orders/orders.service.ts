import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateOrderDto, OrderOverviewDto } from '@ap3/api';

@Injectable()
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  public createOrder(order : CreateOrderDto): Observable<OrderOverviewDto> {
    return this.httpClient.post<OrderOverviewDto>(environment.ORDERS.URL, order);
  }

  public getOrders(): Observable<OrderOverviewDto[]>{
    return this.httpClient.get<OrderOverviewDto[]>(environment.ORDERS.URL);
   }
}
