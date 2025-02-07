import { OfferStatesEnum } from '@ap3/util';
import { Offer } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { ServiceProcessesSeed } from './service-process.seed';

export const OffersSeed: Offer[] = <Offer[]>[
  {
    id: 'of001',
    creationDate: new Date(),
    decisionDate: new Date(),
    scheduledDate: new Date(),
    price: new Decimal(5),
    status: OfferStatesEnum.ACCEPTED,
    serviceProcessId: ServiceProcessesSeed[0].id,
  },
  {
    id: 'of002',
    creationDate: new Date(),
    decisionDate: new Date(),
    scheduledDate: null,
    price: new Decimal(6),
    status: OfferStatesEnum.REFUSED,
    serviceProcessId: ServiceProcessesSeed[0].id,
  },
  {
    id: 'of003',
    creationDate: new Date(),
    decisionDate: new Date(),
    scheduledDate: null,
    price: new Decimal(7),
    status: OfferStatesEnum.OPEN,
    serviceProcessId: ServiceProcessesSeed[0].id,
  },
  {
    id: 'of004',
    creationDate: new Date(),
    decisionDate: new Date(),
    scheduledDate: null,
    price: new Decimal(8),
    status: OfferStatesEnum.REFUSED,
    serviceProcessId: ServiceProcessesSeed[0].id,
  },
  {
    id: 'of005',
    creationDate: new Date(),
    decisionDate: null,
    scheduledDate: null,
    price: new Decimal(5),
    status: OfferStatesEnum.OPEN,
    serviceProcessId: ServiceProcessesSeed[1].id,
  },
  {
    id: 'of006',
    creationDate: new Date(),
    decisionDate: null,
    scheduledDate: null,
    price: new Decimal(6),
    status: OfferStatesEnum.OPEN,
    serviceProcessId: ServiceProcessesSeed[1].id,
  },
  {
    id: 'of007',
    creationDate: new Date(),
    decisionDate: null,
    scheduledDate: null,
    price: new Decimal(7),
    status: OfferStatesEnum.OPEN,
    serviceProcessId: ServiceProcessesSeed[2].id,
  },
  {
    id: 'of008',
    creationDate: new Date(),
    decisionDate: null,
    scheduledDate: null,
    price: new Decimal(8),
    status: OfferStatesEnum.OPEN,
    serviceProcessId: ServiceProcessesSeed[2].id,
  },
];
