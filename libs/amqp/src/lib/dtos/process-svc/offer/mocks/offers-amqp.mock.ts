/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { OffersSeed, ServiceProcessesSeed } from '@ap3/database';
import { OfferAmqpDto } from '../index';

export const OfferAmqpMock = <OfferAmqpDto[]>[
  {
    id: OffersSeed[0].id,
    creationDate: OffersSeed[0].creationDate,
    decisionDate: OffersSeed[0].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[0].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[0].plannedYear),
    price: Number(OffersSeed[0].price),
    status: OffersSeed[0].status,
    orderId: ServiceProcessesSeed[0].orderId,
  },
  {
    id: OffersSeed[1].id,
    creationDate: OffersSeed[1].creationDate,
    decisionDate: OffersSeed[1].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[1].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[1].plannedYear),
    price: Number(OffersSeed[1].price),
    status: OffersSeed[1].status,
    orderId: ServiceProcessesSeed[0].orderId,
  },
  {
    id: OffersSeed[2].id,
    creationDate: OffersSeed[2].creationDate,
    decisionDate: OffersSeed[2].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[2].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[2].plannedYear),
    price: Number(OffersSeed[2].price),
    status: OffersSeed[2].status,
    orderId: ServiceProcessesSeed[0].orderId,
  },
  {
    id: OffersSeed[3].id,
    creationDate: OffersSeed[3].creationDate,
    decisionDate: OffersSeed[3].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[3].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[3].plannedYear),
    price: Number(OffersSeed[3].price),
    status: OffersSeed[3].status,
    orderId: ServiceProcessesSeed[0].orderId,
  },
  {
    id: OffersSeed[4].id,
    creationDate: OffersSeed[4].creationDate,
    decisionDate: OffersSeed[4].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[4].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[4].plannedYear),
    price: Number(OffersSeed[4].price),
    status: OffersSeed[4].status,
    orderId: ServiceProcessesSeed[1].orderId,
  },
  {
    id: OffersSeed[5].id,
    creationDate: OffersSeed[5].creationDate,
    decisionDate: OffersSeed[5].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[5].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[5].plannedYear),
    price: Number(OffersSeed[5].price),
    status: OffersSeed[5].status,
    orderId: ServiceProcessesSeed[1].orderId,
  },
];
