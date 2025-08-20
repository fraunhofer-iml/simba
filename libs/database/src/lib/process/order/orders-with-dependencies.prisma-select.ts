/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prisma } from '@prisma/client';

export const ordersWithDependenciesSelect = {
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
      acceptedOffer: {
        select: {
          id: true,
          basicPrice: true,
          timeToProduction: true,
          utilization: true,
        },
      },
      machineAssignments: {
        include: {
          machine: true,
        },
      },
      offers: {
        select: {
          id: true,
        },
      },
      states: true,
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
} satisfies Prisma.OrderSelect;
