/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { invoiceSeed, ordersSeed, paymentStatesSeed, tradeReceivablesSeed } from '@ap3/database';
import { PaymentStatusAmqpDto } from '../../trade-receivable';
import { InvoiceAmqpDto } from '../invoice-amqp.dto';

export const invoicesAmqpMock = <InvoiceAmqpDto[]>[
  {
    id: invoiceSeed[0].id,
    debtorId: invoiceSeed[0].debtorId,
    creditorId: invoiceSeed[0].creditorId,
    orderId: ordersSeed[0].id,
    orderNumber: ordersSeed[0].buyerOrderRefDocumentId,
    nft: tradeReceivablesSeed[0].nft,
    totalAmountWithoutVat: +invoiceSeed[0].totalAmountWithoutVat,
    status: new PaymentStatusAmqpDto(paymentStatesSeed[1].status, paymentStatesSeed[1].timestamp),
    invoiceNumber: invoiceSeed[0].invoiceNumber,
    invoiceDueDate: invoiceSeed[0].dueDate,
    url: invoiceSeed[0].url,
    currency: invoiceSeed[0].contractCurrency,
    measuringUnit: invoiceSeed[0].measuringUnit,
    netPricePerUnit: invoiceSeed[0].netPricePerUnit,
    vat: String(invoiceSeed[0].vat),
    paymentTerms: invoiceSeed[0].paymentTerms,
    serviceProcessId: invoiceSeed[0].serviceProcessId,
  },
  {
    id: invoiceSeed[1].id,
    debtorId: invoiceSeed[1].debtorId,
    creditorId: invoiceSeed[1].creditorId,
    orderId: ordersSeed[1].id,
    orderNumber: ordersSeed[1].buyerOrderRefDocumentId,
    nft: tradeReceivablesSeed[1].nft,
    totalAmountWithoutVat: +invoiceSeed[1].totalAmountWithoutVat,
    status: new PaymentStatusAmqpDto(paymentStatesSeed[3].status, paymentStatesSeed[3].timestamp),
    invoiceNumber: invoiceSeed[1].invoiceNumber,
    invoiceDueDate: invoiceSeed[1].dueDate,
    url: invoiceSeed[1].url,
    currency: invoiceSeed[1].contractCurrency,
    measuringUnit: invoiceSeed[1].measuringUnit,
    netPricePerUnit: invoiceSeed[1].netPricePerUnit,
    vat: String(invoiceSeed[1].vat),
    paymentTerms: invoiceSeed[1].paymentTerms,
    serviceProcessId: invoiceSeed[1].serviceProcessId,
  },
  {
    id: invoiceSeed[2].id,
    debtorId: invoiceSeed[2].debtorId,
    creditorId: invoiceSeed[2].creditorId,
    orderId: '',
    orderNumber: '',
    nft: '',
    totalAmountWithoutVat: +invoiceSeed[2].totalAmountWithoutVat,
    status: new PaymentStatusAmqpDto(paymentStatesSeed[0].status, paymentStatesSeed[0].timestamp),
    invoiceNumber: invoiceSeed[2].invoiceNumber,
    invoiceDueDate: invoiceSeed[2].dueDate,
    url: invoiceSeed[2].url,
    currency: invoiceSeed[2].contractCurrency,
    measuringUnit: invoiceSeed[2].measuringUnit,
    netPricePerUnit: invoiceSeed[2].netPricePerUnit,
    vat: String(invoiceSeed[2].vat),
    paymentTerms: invoiceSeed[2].paymentTerms,
    serviceProcessId: invoiceSeed[2].serviceProcessId,
  },
];
