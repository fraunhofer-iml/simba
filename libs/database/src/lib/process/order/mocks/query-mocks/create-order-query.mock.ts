/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prisma } from '@prisma/client';
import { orderLinesSeed, ordersSeed, serviceProcessesSeed } from '../../../../../seed';

export const createOrderQueryMock = <Prisma.OrderCreateInput>{
  totalAmountWithoutVat: ordersSeed[0].totalAmountWithoutVat,
  vatCurrency: ordersSeed[0].vatCurrency,
  buyer: { connect: { id: ordersSeed[0].buyerId } },
  seller: { connect: { id: ordersSeed[0].sellerId } },
  serviceProcess: {
    create: { dueCalendarWeek: serviceProcessesSeed[0].dueCalendarWeek, dueYear: serviceProcessesSeed[0].dueYear },
  },
  orderLines: {
    create: {
      requestedQuantity: orderLinesSeed[0].requestedQuantity,
      netPrice: orderLinesSeed[0].netPrice,
      item: {
        connect: {
          id: orderLinesSeed[0].itemId,
        },
      },
    },
  },
};
