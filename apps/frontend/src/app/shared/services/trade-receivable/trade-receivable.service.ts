import { PaidTrStatisticsDto, UnpaidTrStatisticsDto } from '@ap3/api';
import { BASE_URL } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../endpoints/endpoints';

@Injectable()
export class TradeReceivableService {
  constructor(private readonly httpClient: HttpClient) {}

  getPaidTradeReceivablesStatistics(year: number): Observable<PaidTrStatisticsDto[]> {
    return this.httpClient.get<PaidTrStatisticsDto[]>(
      `${BASE_URL}${ApiEndpoints.tradeReceivables.getPaidTradeReceivablesStatistics}?year=${year}`
    );
  }

  getUnPaidTradeReceivablesStatistics(): Observable<UnpaidTrStatisticsDto> {
    return this.httpClient.get<UnpaidTrStatisticsDto>(`${BASE_URL}${ApiEndpoints.tradeReceivables.getUnPaidTradeReceivablesStatistics}`);
  }
}
