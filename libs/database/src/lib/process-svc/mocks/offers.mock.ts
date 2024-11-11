import { OfferStatesEnum } from '@ap3/config';
import { Offer } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const date = new Date();

export const offersMock = <Offer[]>[
  {
    id: 'cm2agsjsk00019tf1urzymlqu',
    creationDate: date,
    decisionDate: date,
    scheduledDate: date,
    price: new Decimal(1),
    status: OfferStatesEnum.ACCEPTED.toString(),
    serviceProcessId: 'cm32tlpy0000108kyhv7vetzh',
  },
  {
    id: 'cm2agsjsn00029tf1z3rqc9vp',
    creationDate: date,
    decisionDate: date,
    scheduledDate: date,
    price: new Decimal(2),
    status: OfferStatesEnum.OPEN.toString(),
    serviceProcessId: 'cm32tlpy0000108kyhv7vetzh',
  },
  {
    id: 'cm34b6den000808jkam6e39iu',
    creationDate: date,
    decisionDate: date,
    scheduledDate: date,
    price: new Decimal(3),
    status: OfferStatesEnum.OPEN.toString(),
    serviceProcessId: 'cm32tlpy0000108kyhv7vetzh',
  },
  {
    id: 'cm2agsjsn00029tf1z3rqc7vp',
    creationDate: date,
    decisionDate: date,
    scheduledDate: date,
    price: new Decimal(4),
    status: OfferStatesEnum.OPEN.toString(),
    serviceProcessId: 'cm32tlpy0000108kyhv7vetzh',
  },
];

export const offersAmqpMock = [
  {
    id: 'cm2agsjsk00019tf1urzymlqu',
    creationDate: date,
    price: new Number(1),
    status: OfferStatesEnum.ACCEPTED.toString(),
    orderId: 'cm2uiedwn000108miftzcf209',
  },
  {
    id: 'cm2agsjsn00029tf1z3rqc9vp',
    creationDate: date,
    price: new Number(1),
    status: OfferStatesEnum.ACCEPTED.toString(),
    orderId: 'cm2uiedwn000108miftzcf209',
  },
  {
    id: 'cm34b6den000808jkam6e39iu',
    creationDate: date,
    price: new Number(1),
    status: OfferStatesEnum.ACCEPTED.toString(),
    orderId: 'cm2uiedwn000108miftzcf209',
  },
  {
    id: 'cm2agsjsn00029tf1z3rqc7vp',
    creationDate: date,
    price: new Number(1),
    status: OfferStatesEnum.ACCEPTED.toString(),
    orderId: 'cm2uiedwn000108miftzcf209',
  },
];
