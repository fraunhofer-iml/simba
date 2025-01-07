import { PaidTrStatisticsDto, UnpaidTrStatisticsDto } from '@ap3/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { ApiEndpoints } from '../endpoints/endpoints';

@Injectable()
export class TradeReceivableService {
  constructor(private readonly httpClient: HttpClient) {}

  getPaidTradeReceivablesStatistics(financialRole: string, year: number): Observable<PaidTrStatisticsDto[]> {
    return this.httpClient.get<PaidTrStatisticsDto[]>(
      `${BASE_URL}${ApiEndpoints.tradeReceivables.getPaidTradeReceivablesStatistics}?year=${year}&financialRole=${financialRole}`
    );
  }

  getUnPaidTradeReceivablesStatistics(financialRole: string): Observable<UnpaidTrStatisticsDto> {
    return this.httpClient.get<UnpaidTrStatisticsDto>(
      `${BASE_URL}${ApiEndpoints.tradeReceivables.getUnPaidTradeReceivablesStatistics}?financialRole=${financialRole}`
    );
  }
}
