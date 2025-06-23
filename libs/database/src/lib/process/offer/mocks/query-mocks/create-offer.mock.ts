/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OfferStatesEnum, ServiceStatesEnum } from '@ap3/util';
import { Prisma } from '@prisma/client';
import { OffersSeed, ServiceProcessesSeed } from '../../../../../seed';

export const createOfferQuery = <Prisma.OfferCreateInput>{
  creationDate: new Date('2024-08-16T10:09:41.295Z'),
  price: 0.4,
  status: OfferStatesEnum.OPEN,
  serviceProcess: {
    connect: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
  },
};

export const setServiceStateToAcceptedQuery = <Prisma.OrderUpdateInput>{
  where: { orderId: String(ServiceProcessesSeed[0].orderId) },
  include: { order: true },
  data: {
    states: {
      create: {
        status: ServiceStatesEnum.PLANNED,
        timestamp: new Date('2024-08-16T10:09:41.295Z'),
      },
    },
  },
};

export const setServiceStateToCanceledQuery = <Prisma.OrderUpdateInput>{
  where: { orderId: String(ServiceProcessesSeed[0].orderId) },
  include: { order: true },
  data: {
    states: {
      create: {
        status: ServiceStatesEnum.CANCELED,
        timestamp: new Date('2024-08-16T10:09:41.295Z'),
      },
    },
  },
};

export const setAcceptedForServiceQuery = <Prisma.OrderUpdateInput>{
  where: { id: String(ServiceProcessesSeed[0].id) },
  data: {
    acceptedOfferId: OffersSeed[0].id,
  },
};

export const setOfferStateToAcceptedQuery = <Prisma.OfferUpdateInput>{
  where: { id: OffersSeed[0].id },
  data: {
    status: OfferStatesEnum.ACCEPTED.toString(),
    decisionDate: new Date('2024-08-16T10:09:41.295Z'),
  },
};

export const setOfferStateToDeclinedQuery = <Prisma.OfferUpdateInput>{
  where: { id: OffersSeed[3].id },
  data: {
    status: OfferStatesEnum.REFUSED,
    decisionDate: new Date('2024-08-16T10:09:41.295Z'),
  },
};
