/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prisma } from '@prisma/client';
import { ordersSeed } from '../../../../../seed';

const ordersOverviewSelect = <Prisma.OrderSelect>{
  id: true,
  documentIssueDate: true,
  buyerOrderRefDocumentId: true,
  vatCurrency: true,
  totalAmountWithoutVat: true,
  orderLines: {
    select: {
      item: true,
      requestedQuantity: true,
      netPrice: true,
      unitOfMeasureCodeAgreed: true,
    },
  },
  serviceProcess: {
    include: {
      machineAssignments: {
        include: {
          machine: true,
        },
      },
      states: true,
      offers: {
        select: {
          id: true,
        },
      },
      acceptedOffer: {
        select: {
          id: true,
          basicPrice: true,
          timeToProduction: true,
          utilization: true,
        },
      },
      invoices: {
        select: {
          id: true,
        },
      },
    },
  },
  buyer: {
    select: {
      id: true,
      name: true,
    },
  },
  seller: {
    select: {
      id: true,
      name: true,
    },
  },
};

export const findSingleOrderMock = <Prisma.OrderWhereInput>{
  where: { AND: [{ id: { in: [String(ordersSeed[0].id)] } }] },
  select: ordersOverviewSelect,
};

export const findAllOrdersQueryMock = <Prisma.OrderWhereInput>{
  where: {
    OR: [
      { buyerId: 'pt0001' },
      { sellerId: 'pt0001' },
      {
        serviceProcess: {
          machineAssignments: {
            some: {
              machine: { companyId: 'pt0001' },
            },
          },
        },
      },
    ],
  },
  select: ordersOverviewSelect,
};
