import { OffersSeed, ServiceProcessesSeed } from '@ap3/database';
import { OfferAmqpDto } from '../offer';

export const OfferAmqpMock = <OfferAmqpDto[]>[
  {
    id: OffersSeed[0].id,
    creationDate: OffersSeed[0].creationDate,
    price: new Number(OffersSeed[0].price),
    status: OffersSeed[0].status,
    orderId: ServiceProcessesSeed[0].orderId,
  },
  {
    id: OffersSeed[1].id,
    creationDate: OffersSeed[1].creationDate,
    price: new Number(OffersSeed[1].price),
    status: OffersSeed[1].status,
    orderId: ServiceProcessesSeed[0].orderId,
  },
  {
    id: OffersSeed[2].id,
    creationDate: OffersSeed[2].creationDate,
    price: new Number(OffersSeed[2].price),
    status: OffersSeed[2].status,
    orderId: ServiceProcessesSeed[0].orderId,
  },
  {
    id: OffersSeed[3].id,
    creationDate: OffersSeed[3].creationDate,
    price: new Number(OffersSeed[3].price),
    status: OffersSeed[3].status,
    orderId: ServiceProcessesSeed[0].orderId,
  },
  {
    id: OffersSeed[4].id,
    creationDate: OffersSeed[4].creationDate,
    price: new Number(OffersSeed[4].price),
    status: OffersSeed[4].status,
    orderId: ServiceProcessesSeed[1].orderId,
  },
  {
    id: OffersSeed[5].id,
    creationDate: OffersSeed[5].creationDate,
    price: new Number(OffersSeed[5].price),
    status: OffersSeed[5].status,
    orderId: ServiceProcessesSeed[1].orderId,
  },
];
