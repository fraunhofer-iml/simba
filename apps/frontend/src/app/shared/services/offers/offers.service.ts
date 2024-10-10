import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferDto, OrderDto } from '@ap3/api';
import { BASE_URL} from '../../../../environments/environment';
import { ApiEndpoints } from '../endpoints/endpoints';

@Injectable()
export class OffersService {
  constructor(private httpClient: HttpClient) {}

  public getOffersByOrderId(orderId: string): Observable<OfferDto[]> {
    let params = new HttpParams();
    params = params.set('orderId', orderId);
    return this.httpClient.get<OfferDto[]>(`${BASE_URL}${ApiEndpoints.offers.getAllOffers}`, { params });
  }

  public getOfferById(offerId: string): Observable<OfferDto> {
    return this.httpClient.get<OfferDto>(`${BASE_URL}${ApiEndpoints.offers.getAllOffers}/${offerId}`);
  }

  public acceptOffer(offerId: string): Observable<OfferDto> {
    return this.httpClient.patch<OfferDto>(`${BASE_URL}${ApiEndpoints.offers.getAllOffers}/${offerId}${ApiEndpoints.offers.acceptOffer}`, offerId);
  }

  public declineAllOffersByOrderId(orderId: string): Observable<OrderDto> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('orderId', orderId);
    return this.httpClient.patch<OrderDto>(`${BASE_URL}${ApiEndpoints.offers.getAllOffers}${ApiEndpoints.offers.declineAllOffers}`,{}, {params : httpParams} );
  }
}
