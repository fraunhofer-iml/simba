import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OffersService } from './offers.service';
import { OfferDto, OpenOffersMock } from '@ap3/api';
import { environment } from '../../../../environments/environment';

describe('OffersService', () => {
  let service: OffersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OffersService],
    }).compileComponents();

    service = TestBed.inject(OffersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get offers', () => {
    const mockOffers: OfferDto[] = OpenOffersMock;
    const orderId = '123';

    service.getOffersByOrderId(orderId).subscribe(offers => {
      expect(offers).toEqual(mockOffers);
    });

    const req = httpMock.expectOne(`${environment.OFFERS.URL}?orderId=${orderId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOffers);
  });

  it('should get one offer', () => {
    const mockOffer: OfferDto = OpenOffersMock[0];
    const offerId = '1';

    service.getOfferById(offerId).subscribe(offer => {
      expect(offer).toEqual(mockOffer);
    });

    const req = httpMock.expectOne(`${environment.OFFERS.URL}/${offerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOffer);
  });

  it('should accept an offer', () => {
    const mockOffer: OfferDto = OpenOffersMock[0];
    const offerId = '1';

    service.acceptOffer(offerId).subscribe(offer => {
      expect(offer).toEqual(mockOffer);
    });

    const req = httpMock.expectOne(`${environment.OFFERS.URL}/${offerId}/accept`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toBe(offerId);
    req.flush(mockOffer);
  });

  it('should handle errors', () => {
    const orderId = '123';
    const errorMessage = 'Failed';

    service.declineAllOffersByOrderId(orderId).subscribe(
      () => fail('failed'),
      (error) => expect(error.message).toBe(errorMessage)
    );

    const req = httpMock.expectOne(`${environment.OFFERS.URL}/decline?orderId=${orderId}`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
