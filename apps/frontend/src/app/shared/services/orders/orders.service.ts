import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrderDto, OrderDto } from 'libs/api/src/dtos/order/order.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  public createOrder(order : CreateOrderDto): Observable<OrderDto> {
    return this.httpClient.post<OrderDto>(environment.ORDERS.URL, order);
  }

  public getOrders(): Observable<OrderDto[]>{
    return this.httpClient.get<OrderDto[]>(environment.ORDERS.URL);
   }
}
