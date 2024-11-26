import { TradeReceivableDto } from '@ap3/api';
import { BASE_URL } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../endpoints/endpoints';

@Injectable()
export class TradeReceivableService {
  constructor(private httpClient: HttpClient) {}

  getTradeReceivables(): Observable<TradeReceivableDto[]> {
    return this.httpClient.get<TradeReceivableDto[]>(`${BASE_URL}${ApiEndpoints.tradeReceivables.getAllTradeReceivables}`);
  }
}
