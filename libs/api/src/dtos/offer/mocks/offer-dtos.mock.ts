/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OffersSeed, OrdersSeed } from '@ap3/database';
import { OfferDto } from '../offer.dto';

export const offerDtosMock: OfferDto[] = [
  {
    id: OffersSeed[0].id,
    creationDate: OffersSeed[0].creationDate.toISOString(),
    basicPrice: Number(OffersSeed[0].basicPrice),
    timeUntilProduction: Number(OffersSeed[0].timeToProduction),
    utilization: Number(OffersSeed[0].utilization),
    status: OffersSeed[0].status,
    orderId: OrdersSeed[0].id,
    plannedCalendarWeek: Number(OffersSeed[0].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[0].plannedYear),
  },
  {
    id: OffersSeed[1].id,
    creationDate: OffersSeed[1].creationDate.toISOString(),
    basicPrice: Number(OffersSeed[1].basicPrice),
    timeUntilProduction: Number(OffersSeed[1].timeToProduction),
    utilization: Number(OffersSeed[1].utilization),
    status: OffersSeed[1].status,
    orderId: OrdersSeed[1].id,
    plannedCalendarWeek: Number(OffersSeed[1].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[1].plannedYear),
  },
  {
    id: OffersSeed[2].id,
    creationDate: OffersSeed[2].creationDate.toISOString(),
    basicPrice: Number(OffersSeed[2].basicPrice),
    timeUntilProduction: Number(OffersSeed[2].timeToProduction),
    utilization: Number(OffersSeed[2].utilization),
    status: OffersSeed[2].status,
    orderId: OrdersSeed[2].id,
    plannedCalendarWeek: Number(OffersSeed[2].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[2].plannedYear),
  },
  {
    id: OffersSeed[3].id,
    creationDate: OffersSeed[3].creationDate.toISOString(),
    basicPrice: Number(OffersSeed[3].basicPrice),
    timeUntilProduction: Number(OffersSeed[3].timeToProduction),
    utilization: Number(OffersSeed[3].utilization),
    status: OffersSeed[3].status,
    orderId: OrdersSeed[3].id,
    plannedCalendarWeek: Number(OffersSeed[3].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[3].plannedYear),
  },
  {
    id: OffersSeed[4].id,
    creationDate: OffersSeed[4].creationDate.toISOString(),
    basicPrice: Number(OffersSeed[4].basicPrice),
    timeUntilProduction: Number(OffersSeed[4].timeToProduction),
    utilization: Number(OffersSeed[4].utilization),
    status: OffersSeed[4].status,
    orderId: OrdersSeed[4].id,
    plannedCalendarWeek: Number(OffersSeed[4].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[4].plannedYear),
  },
  {
    id: OffersSeed[5].id,
    creationDate: OffersSeed[5].creationDate.toISOString(),
    basicPrice: Number(OffersSeed[5].basicPrice),
    timeUntilProduction: Number(OffersSeed[5].timeToProduction),
    utilization: Number(OffersSeed[5].utilization),
    status: OffersSeed[5].status,
    orderId: OrdersSeed[5].id,
    plannedCalendarWeek: Number(OffersSeed[5].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[5].plannedYear),
  },
];
