import { InvoiceDto } from '@ap3/api';
import { BASE_URL } from 'apps/frontend/src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../endpoints/endpoints';

@Injectable()
export class InvoiceService {
  constructor(private readonly httpClient: HttpClient) {}

  getInvoices(): Observable<InvoiceDto[]> {
    return this.httpClient.get<InvoiceDto[]>(`${BASE_URL}${ApiEndpoints.invoices.getAllInvoices}`);
  }
}
