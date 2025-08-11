import { ordersSeed } from '@ap3/database';
import { RequestNewOffersDto } from '../request-new-offers.dto';

export const requestNewOffersDtoMock = new RequestNewOffersDto(ordersSeed[0].id, 5);
