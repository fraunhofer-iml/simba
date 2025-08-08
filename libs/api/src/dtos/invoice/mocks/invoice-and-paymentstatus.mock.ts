/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { paymentStatesSeed } from '@ap3/database';
import { InvoiceIdAndPaymentStateDto } from '../invoice-id-and-payment-state';

export const invoiceAndPaymentStatusDtoMock: InvoiceIdAndPaymentStateDto[] = [
  new InvoiceIdAndPaymentStateDto(paymentStatesSeed[0].tradeReceivableId, paymentStatesSeed[0].status),
  new InvoiceIdAndPaymentStateDto(paymentStatesSeed[1].tradeReceivableId, paymentStatesSeed[1].status),
];
