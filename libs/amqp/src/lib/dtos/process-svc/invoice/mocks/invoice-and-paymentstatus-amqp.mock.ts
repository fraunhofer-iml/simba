/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { paymentStatesSeed } from '@ap3/database';
import { PaymentStates } from '@ap3/util';
import { InvoiceIdAndPaymentStateAmqpDto } from '../invoice-id-payment-state.dto';

export const invoiceAndPaymentStatusDtoAmqpMock: InvoiceIdAndPaymentStateAmqpDto[] = [
  new InvoiceIdAndPaymentStateAmqpDto(paymentStatesSeed[0].tradeReceivableId, paymentStatesSeed[0].status as PaymentStates),
  new InvoiceIdAndPaymentStateAmqpDto(paymentStatesSeed[1].tradeReceivableId, paymentStatesSeed[1].status as PaymentStates),
];
