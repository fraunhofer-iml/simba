import { CreateOrderDto, OrderOverviewDto } from '@ap3/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { ApiEndpoints } from '../endpoints/endpoints';

@Injectable()
export class OrdersService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  public createOrder(order: CreateOrderDto): Observable<OrderOverviewDto> {
    order.customerId = this.authService.getCurrentlyLoggedInCompanyId();
    return this.httpClient.post<OrderOverviewDto>(`${BASE_URL}${ApiEndpoints.orders.getAllOrders}`, order);
  }

  public getOrders(): Observable<OrderOverviewDto[]> {
    const companyId = this.authService.getCurrentlyLoggedInCompanyId();
    return this.httpClient.get<OrderOverviewDto[]>(`${BASE_URL}${ApiEndpoints.orders.getAllOrders}`, {
      params: {
        companyId: companyId,
      },
    });
  }
}
