/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prisma } from '@prisma/client';

export class InvoiceIdAndPaymentStateAmqpDto {
  invoiceId: string;
  paymentStatus: string;

  constructor(invoiceId: string, paymentState: string) {
    this.invoiceId = invoiceId;
    this.paymentStatus = paymentState;
  }

  public toPrismaCreatePaymentStatusQuery(tradeReceivableId: string, statusTimestamp: Date): Prisma.PaymentStatusCreateInput {
    return <Prisma.PaymentStatusCreateInput>{
      status: this.paymentStatus,
      timestamp: statusTimestamp,
      tradeReceivable: { connect: { id: tradeReceivableId } },
    };
  }
}
