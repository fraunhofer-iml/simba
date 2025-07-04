/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prisma } from '@prisma/client';
import { OrdersSeed } from '../../../../../seed/orders.seed';

export const findLatestServiceStatusQuery = <Prisma.ServiceStatusFindFirstArgs[]>[
  {
    where: {
      serviceProcess: {
        orderId: OrdersSeed[0].id,
      },
    },
    include: {
      serviceProcess: {
        select: {
          orderId: true,
        },
      },
    },
    orderBy: {
      timestamp: 'desc',
    },
  },
  {
    where: {
      serviceProcess: {
        orderId: OrdersSeed[1].id,
      },
    },
    include: {
      serviceProcess: {
        select: {
          orderId: true,
        },
      },
    },
    orderBy: {
      timestamp: 'desc',
    },
  },
];
