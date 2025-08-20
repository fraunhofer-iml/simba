/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { PaymentStatus } from '@prisma/client';
import { invoiceSeed, paymentStatesSeed } from '../../../../seed';

export const paymentStatusMocks: PaymentStatus[] = [
  <PaymentStatus>{
    invoiceId: invoiceSeed[0].id,
    status: paymentStatesSeed[0].status,
    timestamp: paymentStatesSeed[0].timestamp,
  },
  <PaymentStatus>{
    invoiceId: invoiceSeed[1].id,
    status: paymentStatesSeed[1].status,
    timestamp: paymentStatesSeed[0].timestamp,
  },
];
