/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { companiesSeed, invoiceSeed, ordersSeed, paymentStatesSeed } from '@ap3/database';
import { PaymentStates } from '@ap3/util';
import { InvoiceDto } from '../invoice.dto';

export const invoiceDtoMocks: InvoiceDto[] = [
  new InvoiceDto(
    invoiceSeed[0].id,
    invoiceSeed[0].invoiceNumber,
    ordersSeed[0].buyerOrderRefDocumentId ? ordersSeed[0].buyerOrderRefDocumentId : '',
    companiesSeed[1].id,
    companiesSeed[1].name,
    +invoiceSeed[0].totalAmountWithoutVat,
    invoiceSeed[0].dueDate.toISOString(),
    companiesSeed[0].id,
    companiesSeed[0].name,
    paymentStatesSeed[1].status,
    invoiceSeed[0].url,
    invoiceSeed[0].contractCurrency
  ),
  new InvoiceDto(
    invoiceSeed[1].id,
    invoiceSeed[1].invoiceNumber,
    ordersSeed[1].buyerOrderRefDocumentId ? ordersSeed[1].buyerOrderRefDocumentId : '',
    companiesSeed[1].id,
    companiesSeed[1].name,
    +invoiceSeed[1].totalAmountWithoutVat,
    invoiceSeed[1].dueDate.toISOString(),
    companiesSeed[0].id,
    companiesSeed[0].name,
    paymentStatesSeed[3].status,
    invoiceSeed[1].url,
    invoiceSeed[1].contractCurrency
  ),
  new InvoiceDto(
    invoiceSeed[2].id,
    invoiceSeed[2].invoiceNumber,
    '',
    companiesSeed[1].id,
    companiesSeed[1].name,
    +invoiceSeed[2].totalAmountWithoutVat,
    invoiceSeed[2].dueDate.toISOString(),
    companiesSeed[0].id,
    companiesSeed[0].name,
    PaymentStates.OPEN,
    invoiceSeed[2].url,
    invoiceSeed[2].contractCurrency
  ),
];
