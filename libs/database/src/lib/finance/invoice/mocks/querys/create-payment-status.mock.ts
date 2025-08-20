/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { Prisma } from '@prisma/client';
import { paymentStatesSeed } from '../../../../../seed';

export const createPaymentStatusQueryMocks: Prisma.PaymentStatusCreateInput[] = [
  <Prisma.PaymentStatusCreateInput>{
    status: paymentStatesSeed[0].status,
    timestamp: paymentStatesSeed[0].timestamp,
    invoice: { connect: { id: paymentStatesSeed[0].invoiceId } },
  },
  <Prisma.PaymentStatusCreateInput>{
    status: paymentStatesSeed[1].status,
    timestamp: paymentStatesSeed[0].timestamp,
    invoice: { connect: { id: paymentStatesSeed[1].invoiceId } },
  },
];
