/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStates } from '@ap3/util';
import { Prisma } from '@prisma/client';

export class InvoiceIdAndPaymentStateAmqpDto {
  invoiceId: string;
  paymentStatus: PaymentStates;

  constructor(invoiceId: string, paymentState: PaymentStates) {
    this.invoiceId = invoiceId;
    this.paymentStatus = paymentState;
  }

  public toPrismaCreatePaymentStatusQuery(invoiceId: string, statusTimestamp: Date): Prisma.PaymentStatusCreateInput {
    return <Prisma.PaymentStatusCreateInput>{
      status: this.paymentStatus,
      timestamp: statusTimestamp,
      invoice: { connect: { id: invoiceId } },
    };
  }
}
