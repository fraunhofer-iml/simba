/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStatesSeed } from '@ap3/database';
import { InvoiceIdAndPaymentStateAmqpDto } from '../invoice-id-payment-state.dto';

export const InvoiceAndPaymentStatusDtoAmqpMock: InvoiceIdAndPaymentStateAmqpDto[] = [
  new InvoiceIdAndPaymentStateAmqpDto(PaymentStatesSeed[0].tradeReceivableId, PaymentStatesSeed[0].status),
  new InvoiceIdAndPaymentStateAmqpDto(PaymentStatesSeed[1].tradeReceivableId, PaymentStatesSeed[1].status),
];
