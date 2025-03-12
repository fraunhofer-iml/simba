/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceDto, InvoiceIdAndPaymentStateDto, PaidStatisticsDto, UnpaidStatisticsDto } from '@ap3/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { ApiEndpoints } from '../../constants/endpoints';
import { AuthService } from '../auth/auth.service';
import { TokenReadDto } from 'nft-folder-blockchain-connector';

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

  createNewPaymentStatus(changes: InvoiceIdAndPaymentStateDto[]): Observable<boolean> {
    return this.httpClient.post<boolean>(`${BASE_URL}${ApiEndpoints.invoices.updatePaymentStatus}`, changes);
  }

  getNftByInvoiceNumber(invoiceNumber: string): Observable<TokenReadDto> {
    return this.httpClient.get<TokenReadDto>(`${BASE_URL}${ApiEndpoints.tradeReceivables.getALlTradeReceivableNfts}/${invoiceNumber}`)
  }
}
