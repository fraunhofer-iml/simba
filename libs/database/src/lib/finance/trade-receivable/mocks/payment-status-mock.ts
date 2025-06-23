/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStatus } from '@prisma/client';
import { PaymentStatesSeed } from '../../../../seed/payment-states.seed';

export const PaymentStatusMocks: PaymentStatus[] = [
  <PaymentStatus>{
    tradeReceivableId: PaymentStatesSeed[0].tradeReceivableId,
    status: PaymentStatesSeed[0].status,
    timestamp: PaymentStatesSeed[0].timestamp,
  },
  <PaymentStatus>{
    tradeReceivableId: PaymentStatesSeed[1].tradeReceivableId,
    status: PaymentStatesSeed[1].status,
    timestamp: PaymentStatesSeed[0].timestamp,
  },
];
