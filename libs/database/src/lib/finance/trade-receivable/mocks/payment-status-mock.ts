/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStatus } from '@prisma/client';
import { paymentStatesSeed } from '../../../../seed/payment-states.seed';

export const paymentStatusMocks: PaymentStatus[] = [
  <PaymentStatus>{
    tradeReceivableId: paymentStatesSeed[0].tradeReceivableId,
    status: paymentStatesSeed[0].status,
    timestamp: paymentStatesSeed[0].timestamp,
  },
  <PaymentStatus>{
    tradeReceivableId: paymentStatesSeed[1].tradeReceivableId,
    status: paymentStatesSeed[1].status,
    timestamp: paymentStatesSeed[0].timestamp,
  },
];
