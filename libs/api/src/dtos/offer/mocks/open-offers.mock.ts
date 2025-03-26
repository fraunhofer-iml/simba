/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OffersSeed } from '@ap3/database';
import { OfferDto } from '../offer.dto';

export const OpenOffersMock: OfferDto[] = [
  {
    id: OffersSeed[2].id,
    creationDate: OffersSeed[2].creationDate.toISOString(),
    price: +OffersSeed[2].price,
    status: OffersSeed[2].status,
    orderId: 'o001',
    plannedCalendarWeek: Number(OffersSeed[2].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[2].plannedYear),
  },
  {
    id: OffersSeed[4].id,
    creationDate: OffersSeed[4].creationDate.toISOString(),
    price: +OffersSeed[4].price,
    status: OffersSeed[4].status,
    orderId: 'o001',
    plannedCalendarWeek: Number(OffersSeed[4].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[4].plannedYear),
  },
];
