import { OffersSeed } from '@ap3/database';
import { OfferDto } from '../offer.dto';

export const OpenOffersMock: OfferDto[] = [
  {
    id: OffersSeed[2].id,
    creationDate: OffersSeed[2].creationDate.toISOString(),
    price: +OffersSeed[2].price,
    status: OffersSeed[2].status,
    orderId: 'o001',
  },
  {
    id: OffersSeed[4].id,
    creationDate: OffersSeed[4].creationDate.toISOString(),
    price: +OffersSeed[4].price,
    status: OffersSeed[4].status,
    orderId: 'o001',
  },
];
