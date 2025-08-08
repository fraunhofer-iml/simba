/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { offersSeed, ordersSeed } from '@ap3/database';
import { OfferAmqpDto } from '../index';

export const offerAmqpMock = <OfferAmqpDto[]>[
  {
    id: offersSeed[0].id,
    creationDate: offersSeed[0].creationDate,
    decisionDate: offersSeed[0].decisionDate,
    plannedCalendarWeek: Number(offersSeed[0].plannedCalendarWeek),
    plannedYear: Number(offersSeed[0].plannedYear),
    basicPrice: Number(offersSeed[0].basicPrice),
    timeToProduction: Number(offersSeed[0].timeToProduction),
    utilization: Number(offersSeed[0].utilization),
    status: offersSeed[0].status,
    orderId: ordersSeed[0].id,
  },
  {
    id: offersSeed[1].id,
    creationDate: offersSeed[1].creationDate,
    decisionDate: offersSeed[1].decisionDate,
    plannedCalendarWeek: Number(offersSeed[1].plannedCalendarWeek),
    plannedYear: Number(offersSeed[1].plannedYear),
     basicPrice: Number(offersSeed[1].basicPrice),
    timeToProduction: Number(offersSeed[1].timeToProduction),
    utilization: Number(offersSeed[1].utilization),
    status: offersSeed[1].status,
    orderId: ordersSeed[1].id,
  },
  {
    id: offersSeed[2].id,
    creationDate: offersSeed[2].creationDate,
    decisionDate: offersSeed[2].decisionDate,
    plannedCalendarWeek: Number(offersSeed[2].plannedCalendarWeek),
    plannedYear: Number(offersSeed[2].plannedYear),
    basicPrice: Number(offersSeed[2].basicPrice),
    timeToProduction: Number(offersSeed[2].timeToProduction),
    utilization: Number(offersSeed[2].utilization),
    status: offersSeed[2].status,
    orderId: ordersSeed[2].id,
  },
  {
    id: offersSeed[3].id,
    creationDate: offersSeed[3].creationDate,
    decisionDate: offersSeed[3].decisionDate,
    plannedCalendarWeek: Number(offersSeed[3].plannedCalendarWeek),
    plannedYear: Number(offersSeed[3].plannedYear),
    basicPrice: Number(offersSeed[3].basicPrice),
    timeToProduction: Number(offersSeed[3].timeToProduction),
    utilization: Number(offersSeed[3].utilization),
    status: offersSeed[3].status,
    orderId: ordersSeed[3].id,
  },
  {
    id: offersSeed[4].id,
    creationDate: offersSeed[4].creationDate,
    decisionDate: offersSeed[4].decisionDate,
    plannedCalendarWeek: Number(offersSeed[4].plannedCalendarWeek),
    plannedYear: Number(offersSeed[4].plannedYear),
    basicPrice: Number(offersSeed[4].basicPrice),
    timeToProduction: Number(offersSeed[4].timeToProduction),
    utilization: Number(offersSeed[4].utilization),
    status: offersSeed[4].status,
    orderId: ordersSeed[4].id,
  },
  {
    id: offersSeed[5].id,
    creationDate: offersSeed[5].creationDate,
    decisionDate: offersSeed[5].decisionDate,
    plannedCalendarWeek: Number(offersSeed[5].plannedCalendarWeek),
    plannedYear: Number(offersSeed[5].plannedYear),
    basicPrice: Number(offersSeed[5].basicPrice),
    timeToProduction: Number(offersSeed[5].timeToProduction),
    utilization: Number(offersSeed[5].utilization),
    status: offersSeed[5].status,
    orderId: ordersSeed[5].id,
  },
];
