import { OffersSeed } from '@ap3/database';
import { OfferStatesEnum } from '@ap3/util';
import { Offer } from '@prisma/client';

export const offerMock: Offer[] = [
  {
    id: OffersSeed[2].id,
    creationDate: OffersSeed[2].creationDate,
    decisionDate: new Date(),
    plannedCalendarWeek: OffersSeed[2].plannedCalendarWeek,
    plannedYear: OffersSeed[2].plannedYear,
    basicPrice: OffersSeed[2].basicPrice,
    utilization: OffersSeed[2].utilization,
    timeToProduction: OffersSeed[2].timeToProduction,
    status: OfferStatesEnum.ACCEPTED,
    serviceProcessId: 'o001',
  },
  {
    id: OffersSeed[2].id,
    creationDate: OffersSeed[2].creationDate,
    decisionDate: new Date(),
    plannedCalendarWeek: OffersSeed[2].plannedCalendarWeek,
    plannedYear: OffersSeed[2].plannedYear,
    basicPrice: OffersSeed[2].basicPrice,
    utilization: OffersSeed[2].utilization,
    timeToProduction: OffersSeed[2].timeToProduction,
    status: OfferStatesEnum.REFUSED,
    serviceProcessId: 'o001',
  },
];
