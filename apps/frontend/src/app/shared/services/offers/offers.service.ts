/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfferDto, RequestNewOffersDto } from '@ap3/api';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { ApiEndpoints } from '../../constants/endpoints';

@Injectable()
export class OffersService {
  constructor(private httpClient: HttpClient) {}

  public generateNewOffers(requestNewOffers: RequestNewOffersDto): Observable<OfferDto[]> {
    return this.httpClient.put<OfferDto[]>(
      `${BASE_URL}${ApiEndpoints.offers.getAllOffers}`,
      requestNewOffers
    );
  }

  public getOfferById(offerId: string): Observable<OfferDto> {
    return this.httpClient.get<OfferDto>(`${BASE_URL}${ApiEndpoints.offers.getAllOffers}/${offerId}`);
  }

  public acceptOffer(offerId: string): Observable<OfferDto> {
    return this.httpClient.patch<OfferDto>(
      `${BASE_URL}${ApiEndpoints.offers.getAllOffers}/${offerId}${ApiEndpoints.offers.acceptOffer}`,
      offerId
    );
  }

  public declineAllOffersByOrderId(orderId: string): Observable<void> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('orderId', orderId);
    return this.httpClient.patch<void>(
      `${BASE_URL}${ApiEndpoints.offers.getAllOffers}${ApiEndpoints.offers.declineAllOffers}`,
      {},
      { params: httpParams }
    );
  }
}
