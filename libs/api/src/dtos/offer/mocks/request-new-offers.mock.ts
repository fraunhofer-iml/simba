import { ordersSeed } from '@ap3/database';
import { RequestNewOffersDto } from '../request-new-offers.dto';

export const requestNewOffersDtoMock = new RequestNewOffersDto(ordersSeed[0].id, 5, 2026);
export const requestNewOffersDtoMockWrongKW = new RequestNewOffersDto(ordersSeed[0].id, 55, 2027);
