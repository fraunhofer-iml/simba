import { ordersSeed } from '@ap3/database';
import { NewOffersRequestAmqpDto } from '../generate-new-offers.dto';

export const newOffersRequestMock = new NewOffersRequestAmqpDto(ordersSeed[0].id, 5);
