/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { invoiceSeed, paymentStatesSeed } from '@ap3/database';
import { InvoiceIdAndPaymentStateDto } from '../invoice-id-and-payment-state';

export const invoiceAndPaymentStatusDtoMock: InvoiceIdAndPaymentStateDto[] = [
  new InvoiceIdAndPaymentStateDto(invoiceSeed[0].id, paymentStatesSeed[0].status),
  new InvoiceIdAndPaymentStateDto(invoiceSeed[1].id, paymentStatesSeed[1].status),
];
