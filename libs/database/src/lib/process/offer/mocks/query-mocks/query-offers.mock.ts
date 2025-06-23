/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OFFER_STATES_TO_SHOW, OfferStatesEnum } from '@ap3/util';
import { OffersSeed, ServiceProcessesSeed } from '../../../../../seed';

export const queryOffersToShowWithOrder = {
  where: {
    AND: [{
      serviceProcess: {
        orderId: {
          equals: String(ServiceProcessesSeed[0].orderId),
        },
      }
    },
    {
    status: {
      in: OFFER_STATES_TO_SHOW,
    },
  }]
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
    AND: [{
      serviceProcess: {
        orderId: {
          equals: ServiceProcessesSeed[0].orderId,
        },
      }
    },
    {
      status: {
        in: [OfferStatesEnum.OPEN.toString()],
      },
    }]
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
