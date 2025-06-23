/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceSeed, OrdersSeed, PaymentStatesSeed, TradeReceivablesSeed } from '@ap3/database';
import { PaymentStatusAmqpDto } from '../../trade-receivable';
import { InvoiceAmqpDto } from '../invoice-amqp.dto';

export const InvoicesAmqpMock = <InvoiceAmqpDto[]>[
  {
    id: InvoiceSeed[0].id,
    debtorId: InvoiceSeed[0].debtorId,
    creditorId: InvoiceSeed[0].creditorId,
    orderId: OrdersSeed[0].id,
    orderNumber: OrdersSeed[0].buyerOrderRefDocumentId,
    nft: TradeReceivablesSeed[0].nft,
    totalAmountWithoutVat: +InvoiceSeed[0].totalAmountWithoutVat,
    status: new PaymentStatusAmqpDto(PaymentStatesSeed[1].status, PaymentStatesSeed[1].timestamp),
    invoiceNumber: InvoiceSeed[0].invoiceNumber,
    invoiceDueDate: InvoiceSeed[0].dueDate,
    url: InvoiceSeed[0].url,
    currency: InvoiceSeed[0].contractCurrency,
    measuringUnit: InvoiceSeed[0].measuringUnit,
    netPricePerUnit: InvoiceSeed[0].netPricePerUnit,
    vat: String(InvoiceSeed[0].vat),
    paymentTerms: InvoiceSeed[0].paymentTerms,
    serviceProcessId: InvoiceSeed[0].serviceProcessId
  },
  {
    id: InvoiceSeed[1].id,
    debtorId: InvoiceSeed[1].debtorId,
    creditorId: InvoiceSeed[1].creditorId,
    orderId: OrdersSeed[1].id,
    orderNumber: OrdersSeed[1].buyerOrderRefDocumentId,
    nft: TradeReceivablesSeed[1].nft,
    totalAmountWithoutVat: +InvoiceSeed[1].totalAmountWithoutVat,
    status: new PaymentStatusAmqpDto(PaymentStatesSeed[3].status, PaymentStatesSeed[3].timestamp),
    invoiceNumber: InvoiceSeed[1].invoiceNumber,
    invoiceDueDate: InvoiceSeed[1].dueDate,
    url: InvoiceSeed[1].url,
    currency: InvoiceSeed[1].contractCurrency,
    measuringUnit: InvoiceSeed[1].measuringUnit,
    netPricePerUnit: InvoiceSeed[1].netPricePerUnit,
    vat: String(InvoiceSeed[1].vat),
    paymentTerms: InvoiceSeed[1].paymentTerms,
    serviceProcessId: InvoiceSeed[1].serviceProcessId
  },
  {
    id: InvoiceSeed[2].id,
    debtorId: InvoiceSeed[2].debtorId,
    creditorId: InvoiceSeed[2].creditorId,
    orderId: '',
    orderNumber: '',
    nft: '',
    totalAmountWithoutVat: +InvoiceSeed[2].totalAmountWithoutVat,
    status: new PaymentStatusAmqpDto(PaymentStatesSeed[0].status, PaymentStatesSeed[0].timestamp),    invoiceNumber: InvoiceSeed[2].invoiceNumber,
    invoiceDueDate: InvoiceSeed[2].dueDate,
    url: InvoiceSeed[2].url,
    currency: InvoiceSeed[2].contractCurrency,
    measuringUnit: InvoiceSeed[2].measuringUnit,
    netPricePerUnit: InvoiceSeed[2].netPricePerUnit,
    vat: String(InvoiceSeed[2].vat),
    paymentTerms: InvoiceSeed[2].paymentTerms,
    serviceProcessId: InvoiceSeed[2].serviceProcessId,
  },
];
