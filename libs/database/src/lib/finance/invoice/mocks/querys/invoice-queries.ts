/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { Prisma } from '@prisma/client';
import { invoiceSeed, ordersSeed } from '../../../../../seed';

const ivQueryInclude = <Prisma.InvoiceInclude>{
  serviceProcess: {
    include: {
      order: {
        select: {
          buyerOrderRefDocumentId: true,
          id: true,
        },
      },
    },
  },
};
export const invoicesByDebtorQueryMock = {
  where: {
    OR: [{ debtorId: invoiceSeed[0].debtorId }],
  },
  include: ivQueryInclude,
};
export const invoicesByCreditorQueryMock = {
  where: {
    OR: [{ creditorId: invoiceSeed[0].creditorId }],
  },
  include: ivQueryInclude,
};
export const invoicesByOrderQueryMock = {
  where: {
    OR: [{ creditorId: invoiceSeed[0].debtorId }, { debtorId: invoiceSeed[0].debtorId }],
    AND: [{ serviceProcess: { orderId: ordersSeed[0].id } }],
  },
  include: ivQueryInclude,
};
export const invoiceIdQueryMock = {
  where: {
    OR: [{ creditorId: invoiceSeed[0].debtorId }, { debtorId: invoiceSeed[0].debtorId }],
    AND: [{ id: { in: [invoiceSeed[0].id] } }],
  },
  include: ivQueryInclude,
};
