/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStates } from '@ap3/util';
import { Prisma } from '@prisma/client';
import { invoiceSeed, ordersSeed, paymentStatesSeed, tradeReceivablesSeed } from '../../../../../seed';

export const createTradeReceivableQuery = <Prisma.TradeReceivableCreateInput>{
  nft: tradeReceivablesSeed[0].nft,
  invoice: { connect: { id: invoiceSeed[0].id } },
  states: { create: { status: PaymentStates.OPEN, timestamp: paymentStatesSeed[3].timestamp } },
};

const trQueryInclude = <Prisma.TradeReceivableInclude>{
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
  tradeReceivable: {
    select: {
      id: true,
      nft: true,
    },
  },
};

export const invoicesByDebtorQueryMock = {
  where: {
    OR: [{ debtorId: invoiceSeed[0].debtorId }],
  },
  include: trQueryInclude,
};

export const invoicesByCreditorQueryMock = {
  where: {
    OR: [{ creditorId: invoiceSeed[0].creditorId }],
  },
  include: trQueryInclude,
};

export const invoicesByOrderQueryMock = {
  where: {
    OR: [{ creditorId: invoiceSeed[0].debtorId }, { debtorId: invoiceSeed[0].debtorId }],
    AND: [{ serviceProcess: { orderId: ordersSeed[0].id } }],
  },
  include: trQueryInclude,
};

export const invoiceIdQueryMock = {
  where: {
    OR: [{ creditorId: invoiceSeed[0].debtorId }, { debtorId: invoiceSeed[0].debtorId }],
    AND: [{ id: { in: [invoiceSeed[0].id] } }],
  },
  include: trQueryInclude,
};
