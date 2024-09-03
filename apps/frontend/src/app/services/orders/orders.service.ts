import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/frontend/src/environments/environments.development';
import { CreateOrderDto, OrderDto } from 'libs/api/src/dtos/order/order.dto';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersService {
baseUrl: string = environment.ORDERSURL;

  constructor(private httpClient: HttpClient) {
   }

   createOrder(order : CreateOrderDto){
    return this.httpClient.post<CreateOrderDto>(this.baseUrl, order).subscribe();
   }

   getOrders(): Observable<OrderDto[]>{
    return this.httpClient.get<OrderDto[]>(this.baseUrl);
   }
}
