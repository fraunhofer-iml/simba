/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoicePaymentStatusCount, invoiceSeed, paymentStatesSeed } from '@ap3/database';
import { PaymentStates } from '@ap3/util';
import { Prisma } from '@prisma/client';
import { InvoiceIdAndPaymentStateAmqpDto } from '../invoice-id-payment-state.dto';

export const invoiceAndPaymentStatusDtoAmqpMock: InvoiceIdAndPaymentStateAmqpDto[] = [
  new InvoiceIdAndPaymentStateAmqpDto(invoiceSeed[0].id, paymentStatesSeed[0].status as PaymentStates),
  new InvoiceIdAndPaymentStateAmqpDto(invoiceSeed[1].id, paymentStatesSeed[1].status as PaymentStates),
];

export const invoicePaymentStatusCountMock = <InvoicePaymentStatusCount[]>[
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
