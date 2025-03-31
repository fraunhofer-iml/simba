/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OffersSeed, OrderLinesSeed } from '@ap3/database';
import { AcceptScheduledOfferDto } from '../accept-scheduled-offer.dto';

export const AcceptScheduledOfferResponseMock = <AcceptScheduledOfferDto>{
  cw: Number(OffersSeed[0].plannedCalendarWeek),
  message: 'Order orAE23 accepted',
  year: Number(OffersSeed[0].plannedYear),
  product: {
    id: OrderLinesSeed[0].itemId,
    quantity: Number(OrderLinesSeed[0].requestedQuantity),
  },
};
