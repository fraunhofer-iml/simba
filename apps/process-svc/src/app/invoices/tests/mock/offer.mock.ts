import { OffersSeed } from '@ap3/database';
import { Offer } from '@prisma/client';
import { OfferStatesEnum } from '@ap3/util';

export const OfferMock: Offer[] = [{
  id: OffersSeed[2].id,
  creationDate: OffersSeed[2].creationDate,
  decisionDate: new Date(),
  plannedCalendarWeek: OffersSeed[2].plannedCalendarWeek,
  plannedYear: OffersSeed[2].plannedYear,
  price: OffersSeed[2].price,
  status: OfferStatesEnum.ACCEPTED,
  serviceProcessId: 'o001'
  },
  {
    id: OffersSeed[2].id,
    creationDate: OffersSeed[2].creationDate,
    decisionDate: new Date(),
    plannedCalendarWeek: OffersSeed[2].plannedCalendarWeek,
    plannedYear: OffersSeed[2].plannedYear,
    price: OffersSeed[2].price,
    status: OfferStatesEnum.REFUSED,
    serviceProcessId: 'o001'
  }];
