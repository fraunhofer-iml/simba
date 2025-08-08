/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prisma } from '@prisma/client';
import { paymentStatusMocks } from '../payment-status-mock';

export const createPaymentStatusQueryMocks: Prisma.PaymentStatusCreateInput[] = [
  <Prisma.PaymentStatusCreateInput>{
    status: paymentStatusMocks[0].status,
    timestamp: paymentStatusMocks[0].timestamp,
    tradeReceivable: { connect: { id: paymentStatusMocks[0].tradeReceivableId } },
  },
  <Prisma.PaymentStatusCreateInput>{
    status: paymentStatusMocks[1].status,
    timestamp: paymentStatusMocks[0].timestamp,
    tradeReceivable: { connect: { id: paymentStatusMocks[1].tradeReceivableId } },
  },
];
