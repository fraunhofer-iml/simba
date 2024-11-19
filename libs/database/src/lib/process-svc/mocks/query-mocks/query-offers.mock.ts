import { OffersSeed, ServiceProcessesSeed } from '../../../../seed';
import { OFFER_STATES_TO_SHOW, OfferStatesEnum } from '../../../constants';

export const queryOffersToShowWithOrder = {
  where: {
    serviceProcess: {
      orderId: {
        equals: String(ServiceProcessesSeed[0].orderId),
      },
    },
    status: {
      in: OFFER_STATES_TO_SHOW,
    },
  },
  include: {
    serviceProcess: {
      include: {
        states: true,
      },
    },
  },
};

export const queryOpenOffersByOrderId = {
  where: {
    serviceProcess: {
      orderId: {
        equals: ServiceProcessesSeed[0].orderId,
      },
    },
    status: {
      in: [OfferStatesEnum.OPEN.toString()],
    },
  },
  include: {
    serviceProcess: {
      include: {
        states: true,
      },
    },
  },
};

export const queryUniqueOrThrow = {
  where: { id: OffersSeed[0].id },
};
