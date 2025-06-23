/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prisma } from '@prisma/client';
import { OrderLinesSeed, OrdersSeed, ServiceProcessesSeed } from '../../../../../seed';

export const createOrderQueryMock = <Prisma.OrderCreateInput>{
  totalAmountWithoutVat: OrdersSeed[0].totalAmountWithoutVat,
  vatCurrency: OrdersSeed[0].vatCurrency,
  buyer: { connect: { id: OrdersSeed[0].buyerId } },
  seller: { connect: { id: OrdersSeed[0].sellerId } },
  serviceProcess: {
    create: { dueCalendarWeek: ServiceProcessesSeed[0].dueCalendarWeek, dueYear: ServiceProcessesSeed[0].dueYear },
  },
  orderLines: {
    create: {
      requestedQuantity: OrderLinesSeed[0].requestedQuantity,
      netPrice: OrderLinesSeed[0].netPrice,
      item: {
        connect: {
          id: OrderLinesSeed[0].itemId,
        },
      },
    },
  },
};
