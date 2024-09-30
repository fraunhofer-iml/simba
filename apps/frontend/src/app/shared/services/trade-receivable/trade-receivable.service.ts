import { TradeReceivableDto } from '@ap3/api';
import { environment } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TradeReceivableService {
  constructor(private httpClient: HttpClient) {}

  getTradeReceivableByUserId(userId: string): Observable<TradeReceivableDto[]> {
    return this.httpClient.get<TradeReceivableDto[]>(`${environment.TRADERECEIVABLES.URL}/${userId}`);
  }
}
