/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { offersSeed, ordersSeed } from '@ap3/database';
import { OfferDto } from '../offer.dto';

export const offerDtosMock: OfferDto[] = [
  {
    id: offersSeed[0].id,
    creationDate: offersSeed[0].creationDate.toISOString(),
    basicPrice: Number(offersSeed[0].basicPrice),
    timeUntilProduction: Number(offersSeed[0].timeToProduction),
    utilization: Number(offersSeed[0].utilization),
    status: offersSeed[0].status,
    orderId: ordersSeed[0].id,
    plannedCalendarWeek: Number(offersSeed[0].plannedCalendarWeek),
    plannedYear: Number(offersSeed[0].plannedYear),
  },
  {
    id: offersSeed[1].id,
    creationDate: offersSeed[1].creationDate.toISOString(),
    basicPrice: Number(offersSeed[1].basicPrice),
    timeUntilProduction: Number(offersSeed[1].timeToProduction),
    utilization: Number(offersSeed[1].utilization),
    status: offersSeed[1].status,
    orderId: ordersSeed[0].id,
    plannedCalendarWeek: Number(offersSeed[1].plannedCalendarWeek),
    plannedYear: Number(offersSeed[1].plannedYear),
  },
  {
    id: offersSeed[2].id,
    creationDate: offersSeed[2].creationDate.toISOString(),
    basicPrice: Number(offersSeed[2].basicPrice),
    timeUntilProduction: Number(offersSeed[2].timeToProduction),
    utilization: Number(offersSeed[2].utilization),
    status: offersSeed[2].status,
    orderId: ordersSeed[0].id,
    plannedCalendarWeek: Number(offersSeed[2].plannedCalendarWeek),
    plannedYear: Number(offersSeed[2].plannedYear),
  },
  {
    id: offersSeed[3].id,
    creationDate: offersSeed[3].creationDate.toISOString(),
    basicPrice: Number(offersSeed[3].basicPrice),
    timeUntilProduction: Number(offersSeed[3].timeToProduction),
    utilization: Number(offersSeed[3].utilization),
    status: offersSeed[3].status,
    orderId: ordersSeed[0].id,
    plannedCalendarWeek: Number(offersSeed[3].plannedCalendarWeek),
    plannedYear: Number(offersSeed[3].plannedYear),
  },
  {
    id: offersSeed[4].id,
    creationDate: offersSeed[4].creationDate.toISOString(),
    basicPrice: Number(offersSeed[4].basicPrice),
    timeUntilProduction: Number(offersSeed[4].timeToProduction),
    utilization: Number(offersSeed[4].utilization),
    status: offersSeed[4].status,
    orderId: ordersSeed[1].id,
    plannedCalendarWeek: Number(offersSeed[4].plannedCalendarWeek),
    plannedYear: Number(offersSeed[4].plannedYear),
  },
  {
    id: offersSeed[5].id,
    creationDate: offersSeed[5].creationDate.toISOString(),
    basicPrice: Number(offersSeed[5].basicPrice),
    timeUntilProduction: Number(offersSeed[5].timeToProduction),
    utilization: Number(offersSeed[5].utilization),
    status: offersSeed[5].status,
    orderId: ordersSeed[1].id,
    plannedCalendarWeek: Number(offersSeed[5].plannedCalendarWeek),
    plannedYear: Number(offersSeed[5].plannedYear),
  },
];
