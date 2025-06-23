/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompaniesSeed, InvoiceSeed, OrdersSeed, PaymentStatesSeed } from '@ap3/database';
import { InvoiceDto } from '../invoice.dto';
import { PaymentStates } from '@ap3/util';

export const InvoiceDtoMocks: InvoiceDto[] = [
  new InvoiceDto(
    InvoiceSeed[0].id,
    InvoiceSeed[0].invoiceNumber,
    OrdersSeed[0].buyerOrderRefDocumentId ? OrdersSeed[0].buyerOrderRefDocumentId : '',
    CompaniesSeed[1].id,
    CompaniesSeed[1].name,
    +InvoiceSeed[0].totalAmountWithoutVat,
    InvoiceSeed[0].dueDate.toISOString(),
    CompaniesSeed[0].id,
    CompaniesSeed[0].name,
    PaymentStatesSeed[1].status,
    InvoiceSeed[0].url,
    InvoiceSeed[0].contractCurrency
  ),
  new InvoiceDto(
    InvoiceSeed[1].id,
    InvoiceSeed[1].invoiceNumber,
    OrdersSeed[1].buyerOrderRefDocumentId ? OrdersSeed[1].buyerOrderRefDocumentId : '',
    CompaniesSeed[1].id,
    CompaniesSeed[1].name,
    +InvoiceSeed[1].totalAmountWithoutVat,
    InvoiceSeed[1].dueDate.toISOString(),
    CompaniesSeed[0].id,
    CompaniesSeed[0].name,
    PaymentStatesSeed[3].status,
    InvoiceSeed[1].url,
    InvoiceSeed[1].contractCurrency
  ),
  new InvoiceDto(
    InvoiceSeed[2].id,
    InvoiceSeed[2].invoiceNumber,
    '',
    CompaniesSeed[1].id,
    CompaniesSeed[1].name,
    +InvoiceSeed[2].totalAmountWithoutVat,
    InvoiceSeed[2].dueDate.toISOString(),
    CompaniesSeed[0].id,
    CompaniesSeed[0].name,
    PaymentStates.OPEN,
    InvoiceSeed[2].url,
    InvoiceSeed[2].contractCurrency
  )
];
