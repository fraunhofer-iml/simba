import { OFFER_STATES_TO_SHOW, OfferStatesEnum } from '@ap3/config';

export const queryOffersToShowWithOrder = {
  where: {
    serviceProcess: {
      orderId: {
        equals: String('cm2uiild9000108mnf080gcp7'),
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
        equals: 'cm2uiedwn000108miftzcf209',
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
  where: { id: 'cm2agsjsk00019tf1urzymlqu' },
};
