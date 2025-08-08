import { offersSeed } from '@ap3/database';
import { OfferStatesEnum } from '@ap3/util';
import { Offer } from '@prisma/client';

export const offerMock: Offer[] = [
  {
    id: offersSeed[2].id,
    creationDate: offersSeed[2].creationDate,
    decisionDate: new Date(),
    plannedCalendarWeek: offersSeed[2].plannedCalendarWeek,
    plannedYear: offersSeed[2].plannedYear,
    basicPrice: offersSeed[2].basicPrice,
    utilization: offersSeed[2].utilization,
    timeToProduction: offersSeed[2].timeToProduction,
    status: OfferStatesEnum.ACCEPTED,
    serviceProcessId: 'o001',
  },
  {
    id: offersSeed[2].id,
    creationDate: offersSeed[2].creationDate,
    decisionDate: new Date(),
    plannedCalendarWeek: offersSeed[2].plannedCalendarWeek,
    plannedYear: offersSeed[2].plannedYear,
    basicPrice: offersSeed[2].basicPrice,
    utilization: offersSeed[2].utilization,
    timeToProduction: offersSeed[2].timeToProduction,
    status: OfferStatesEnum.REFUSED,
    serviceProcessId: 'o001',
  },
];
