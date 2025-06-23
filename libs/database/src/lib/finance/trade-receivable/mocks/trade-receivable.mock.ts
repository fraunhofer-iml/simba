/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStates } from '@ap3/util';
import { Prisma, TradeReceivable } from '@prisma/client';
import { TradeReceivablesSeed } from '../../../../seed';
import { TradeReceivablePaymentStatusCount } from '../types/trade-receivable.types';

export const TradeReceivablePaymentStatusCountMock = <TradeReceivablePaymentStatusCount[]>[
  {
    status: PaymentStates.PAID.toString(),
    count: 3n,
    total_value: new Prisma.Decimal(15),
  },
  {
    status: PaymentStates.EXCEEDED.toString(),
    count: 4n,
    total_value: new Prisma.Decimal(15),
  },
  {
    status: PaymentStates.FINANCED.toString(),
    count: 5n,
    total_value: new Prisma.Decimal(25),
  },
  {
    status: PaymentStates.OPEN.toString(),
    count: 10n,
    total_value: new Prisma.Decimal(43.5),
  },
];

export const TradeReceivableMocks: TradeReceivable[] = [
  <TradeReceivable>{
    id: TradeReceivablesSeed[0].id,
    nft: TradeReceivablesSeed[0].nft,
    invoiceId: TradeReceivablesSeed[0].invoiceId,
  },
  <TradeReceivable>{
    id: TradeReceivablesSeed[1].id,
    nft: TradeReceivablesSeed[1].nft,
    invoiceId: TradeReceivablesSeed[1].invoiceId,
  },
];
