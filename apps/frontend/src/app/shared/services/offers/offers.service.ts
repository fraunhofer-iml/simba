import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferDto, OrderDto } from '@ap3/api';
import { environment } from '../../../../environments/environment';

@Injectable()
export class OffersService {
  constructor(private httpClient: HttpClient) {}

  public getOffersByOrderId(orderId: string): Observable<OfferDto[]> {
    let params = new HttpParams();
    params = params.set('orderId', orderId);
    return this.httpClient.get<OfferDto[]>(environment.OFFERS.URL, { params });
  }

  public getOfferById(offerId: string): Observable<OfferDto> {
    return this.httpClient.get<OfferDto>(`${environment.OFFERS.URL}/${offerId}`);
  }

  public acceptOffer(offerId: string): Observable<OfferDto> {
    return this.httpClient.patch<OfferDto>(`${environment.OFFERS.URL}/${offerId}${environment.OFFERS.ACCEPT}`, offerId);
  }

  public declineAllOffersByOrderId(orderId: string): Observable<OrderDto> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('orderId', orderId);
    return this.httpClient.patch<OrderDto>(`${environment.OFFERS.DECLINE}`,{}, {params : httpParams} );
  }
}
