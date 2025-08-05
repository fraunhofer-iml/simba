/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { OffersSeed, OrdersSeed } from '@ap3/database';
import { OfferAmqpDto } from '../index';

export const OfferAmqpMock = <OfferAmqpDto[]>[
  {
    id: OffersSeed[0].id,
    creationDate: OffersSeed[0].creationDate,
    decisionDate: OffersSeed[0].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[0].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[0].plannedYear),
    basicPrice: Number(OffersSeed[0].basicPrice),
    timeToProduction: Number(OffersSeed[0].timeToProduction),
    utilization: Number(OffersSeed[0].utilization),
    status: OffersSeed[0].status,
    orderId: OrdersSeed[0].id,
  },
  {
    id: OffersSeed[1].id,
    creationDate: OffersSeed[1].creationDate,
    decisionDate: OffersSeed[1].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[1].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[1].plannedYear),
    basicPrice: Number(OffersSeed[1].basicPrice),
    timeToProduction: Number(OffersSeed[1].timeToProduction),
    utilization: Number(OffersSeed[1].utilization),
    status: OffersSeed[1].status,
    orderId: OrdersSeed[1].id,
  },
  {
    id: OffersSeed[2].id,
    creationDate: OffersSeed[2].creationDate,
    decisionDate: OffersSeed[2].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[2].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[2].plannedYear),
    basicPrice: Number(OffersSeed[2].basicPrice),
    timeToProduction: Number(OffersSeed[2].timeToProduction),
    utilization: Number(OffersSeed[2].utilization),
    status: OffersSeed[2].status,
    orderId: OrdersSeed[2].id,
  },
  {
    id: OffersSeed[3].id,
    creationDate: OffersSeed[3].creationDate,
    decisionDate: OffersSeed[3].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[3].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[3].plannedYear),
    basicPrice: Number(OffersSeed[3].basicPrice),
    timeToProduction: Number(OffersSeed[3].timeToProduction),
    utilization: Number(OffersSeed[3].utilization),
    status: OffersSeed[3].status,
    orderId: OrdersSeed[3].id,
  },
  {
    id: OffersSeed[4].id,
    creationDate: OffersSeed[4].creationDate,
    decisionDate: OffersSeed[4].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[4].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[4].plannedYear),
    basicPrice: Number(OffersSeed[4].basicPrice),
    timeToProduction: Number(OffersSeed[4].timeToProduction),
    utilization: Number(OffersSeed[4].utilization),
    status: OffersSeed[4].status,
    orderId: OrdersSeed[4].id,
  },
  {
    id: OffersSeed[5].id,
    creationDate: OffersSeed[5].creationDate,
    decisionDate: OffersSeed[5].decisionDate,
    plannedCalendarWeek: Number(OffersSeed[5].plannedCalendarWeek),
    plannedYear: Number(OffersSeed[5].plannedYear),
    basicPrice: Number(OffersSeed[5].basicPrice),
    timeToProduction: Number(OffersSeed[5].timeToProduction),
    utilization: Number(OffersSeed[5].utilization),
    status: OffersSeed[5].status,
    orderId: OrdersSeed[5].id,
  },
];
