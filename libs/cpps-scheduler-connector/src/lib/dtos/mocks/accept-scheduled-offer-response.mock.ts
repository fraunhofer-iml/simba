/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { offersSeed, orderLinesSeed } from '@ap3/database';
import { AcceptScheduledOfferDto } from '../accept-scheduled-offer.dto';

export const acceptScheduledOfferResponseMock = <AcceptScheduledOfferDto>{
  cw: Number(offersSeed[0].plannedCalendarWeek),
  message: 'Order orAE23 accepted',
  year: Number(offersSeed[0].plannedYear),
  product: {
    id: orderLinesSeed[0].itemId,
    quantity: Number(orderLinesSeed[0].requestedQuantity),
  },
};
