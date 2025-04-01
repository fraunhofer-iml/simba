/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStates } from '@ap3/util';
import { Prisma } from '@prisma/client';
import { InvoiceSeed, OrdersSeed, PaymentStatesSeed, TradeReceivablesSeed } from '../../../../../seed';

export const createTradeReceivableQuery = <Prisma.TradeReceivableCreateInput>{
  nft: TradeReceivablesSeed[0].nft,
  invoice: { connect: { id: InvoiceSeed[0].id } },
  states: { create: { status: PaymentStates.OPEN, timestamp: PaymentStatesSeed[3].timestamp } },
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

export const InvoicesByDebtorQueryMock = {
  where: {
    OR: [{ debtorId: InvoiceSeed[0].debtorId }],
  },
  include: trQueryInclude,
};

export const InvoicesByCreditorQueryMock = {
  where: {
    OR: [{ creditorId: InvoiceSeed[0].creditorId }],
  },
  include: trQueryInclude,
};

export const InvoicesByOrderQueryMock = {
  where: {
    OR: [{ creditorId: InvoiceSeed[0].debtorId }, { debtorId: InvoiceSeed[0].debtorId }],
    AND: [{ serviceProcess: { orderId: OrdersSeed[0].id } }],
  },
  include: trQueryInclude,
};

export const InvoiceIdQueryMock = {
  where: {
    OR: [{ creditorId: InvoiceSeed[0].debtorId }, { debtorId: InvoiceSeed[0].debtorId }],
    AND: [{ id: { in: [InvoiceSeed[0].id] } }],
  },
  include: trQueryInclude,
};
