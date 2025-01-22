import { InvoiceDto, PaidStatisticsDto, UnpaidStatisticsDto } from '@ap3/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { ApiEndpoints } from '../../constants/endpoints';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  getInvoices(): Observable<InvoiceDto[]> {
    const companyId = this.authService.getCurrentlyLoggedInCompanyId();
    return this.httpClient.get<InvoiceDto[]>(`${BASE_URL}${ApiEndpoints.invoices.getAllInvoices}`, {
      params: {
        companyId: companyId,
      },
    });
  }

  downloadInvoicePdf(invoiceUrl: string): Observable<Blob> {
    return this.httpClient.get(invoiceUrl, {
      headers: {
        Accept: 'application/pdf',
      },
      responseType: 'blob',
    });
  }
  getPaidStatistics(financialRole: string, year: number): Observable<PaidStatisticsDto[]> {
    return this.httpClient.get<PaidStatisticsDto[]>(
      `${BASE_URL}${ApiEndpoints.invoices.getPaidStatistics}?year=${year}&financialRole=${financialRole}`
    );
  }

  getUnPaidStatistics(financialRole: string): Observable<UnpaidStatisticsDto> {
    return this.httpClient.get<UnpaidStatisticsDto>(
      `${BASE_URL}${ApiEndpoints.invoices.getUnPaidStatistics}?financialRole=${financialRole}`
    );
  }
}
