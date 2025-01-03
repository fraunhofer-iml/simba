import { InvoiceDto } from '@ap3/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { ApiEndpoints } from '../endpoints/endpoints';

@Injectable()
export class InvoiceService {
  constructor(private readonly httpClient: HttpClient) {}

  getInvoices(): Observable<InvoiceDto[]> {
    return this.httpClient.get<InvoiceDto[]>(`${BASE_URL}${ApiEndpoints.invoices.getAllInvoices}`);
  }

  downloadInvoicePdf(invoiceUrl: string): Observable<Blob> {
    return this.httpClient.get(invoiceUrl, {
      headers: {
        Accept: 'application/pdf',
      },
      responseType: 'blob',
    });
  }
}
