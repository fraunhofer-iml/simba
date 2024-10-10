import { CreateOrderDto, OrderOverviewDto } from '@ap3/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { ApiEndpoints } from '../endpoints/endpoints';

@Injectable()
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  public createOrder(order: CreateOrderDto): Observable<OrderOverviewDto> {
    return this.httpClient.post<OrderOverviewDto>(`${BASE_URL}${ApiEndpoints.orders.getAllOrders}`, order);
  }

  public getOrders(): Observable<OrderOverviewDto[]> {
    return this.httpClient.get<OrderOverviewDto[]>(`${BASE_URL}${ApiEndpoints.orders.getAllOrders}`);
  }
}
