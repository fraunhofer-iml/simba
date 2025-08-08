/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStates } from '@ap3/util';
import { Prisma } from '@prisma/client';
import { invoiceSeed } from '../../../../../seed/invoices.seed';

export const createTradeReceivablePrismaInputMock: Prisma.TradeReceivableCreateInput = <Prisma.TradeReceivableCreateInput>{
  nft: '',
  invoice: { connect: { id: invoiceSeed[0].id } },
  states: { create: { status: PaymentStates.OPEN, timestamp: new Date() } },
};
