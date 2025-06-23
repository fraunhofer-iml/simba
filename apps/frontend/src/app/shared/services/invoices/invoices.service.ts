/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceDto, InvoiceIdAndPaymentStateDto, PaidStatisticsDto, UnpaidStatisticsDto } from '@ap3/api';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { InvoiceFilter } from '../../../model/invoice-filter';
import { ApiEndpoints } from '../../constants/endpoints';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class InvoiceService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  getInvoices(filter?: InvoiceFilter): Observable<InvoiceDto[]> {
    return this.httpClient.get<InvoiceDto[]>(`${BASE_URL}${ApiEndpoints.invoices.getAllInvoices}`, {
      params: this.processFiltersToParams(filter),
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

  getPaidStatistics(invoiceIds: string[], financialRole: string, year: number): Observable<PaidStatisticsDto[]> {
    return this.httpClient.get<PaidStatisticsDto[]>(`${BASE_URL}${ApiEndpoints.invoices.getPaidStatistics}`, {
      params: this.processPaidStatisticsParams(invoiceIds, financialRole, year),
    });
  }

  getUnPaidStatistics(invoiceIds: string[], financialRole: string): Observable<UnpaidStatisticsDto> {
    return this.httpClient.get<UnpaidStatisticsDto>(`${BASE_URL}${ApiEndpoints.invoices.getUnPaidStatistics}`, {
      params: this.processUnPaidStatisticsParams(invoiceIds, financialRole),
    });
  }

  createNewPaymentStatus(changes: InvoiceIdAndPaymentStateDto[]): Observable<boolean> {
    return this.httpClient.post<boolean>(`${BASE_URL}${ApiEndpoints.invoices.updatePaymentStatus}`, changes);
  }

  getNftByInvoiceNumber(invoiceNumber: string): Observable<TokenReadDto> {
    return this.httpClient.get<TokenReadDto>(`${BASE_URL}${ApiEndpoints.tradeReceivables.getALlTradeReceivableNfts}/${invoiceNumber}`);
  }

  processFiltersToParams(filter?: InvoiceFilter): HttpParams {
    let params = new HttpParams();
    if (filter) {
      for (const key in filter) {
        if (Array.isArray(filter[key as keyof InvoiceFilter])) {
          params = params.append(key, JSON.stringify(filter[key as keyof InvoiceFilter]));
        } else {
          params = params.append(key, String(filter[key as keyof InvoiceFilter]));
        }
      }
    }
    return params;
  }

  processPaidStatisticsParams(invoiceIds: string[], financialRole: string, year: number): HttpParams {
    let params = new HttpParams();
    params = params.append('invoiceIds', JSON.stringify(invoiceIds));
    params = params.append('financialRole', financialRole);
    params = params.append('year', year);
    return params;
  }

  processUnPaidStatisticsParams(invoiceIds: string[], financialRole: string): HttpParams {
    let params = new HttpParams();
    params = params.append('invoiceIds', JSON.stringify(invoiceIds));
    params = params.append('financialRole', financialRole);
    return params;
  }
}
