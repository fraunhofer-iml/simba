/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { invoiceSeed, ordersSeed } from '../../../../seed';
import { InvoiceWithOrderBuyerRef } from '../types';

export const invoiceNFTPrismaMock: any[] = <InvoiceWithOrderBuyerRef[]>[
  {
    id: invoiceSeed[0].id,
    debtorId: invoiceSeed[0].debtorId,
    creditorId: invoiceSeed[0].creditorId,
    invoiceNumber: invoiceSeed[0].invoiceNumber,
    creationDate: invoiceSeed[0].creationDate,
    dueDate: invoiceSeed[0].dueDate,
    contractCurrency: invoiceSeed[0].contractCurrency,
    measuringUnit: invoiceSeed[0].measuringUnit,
    netPricePerUnit: invoiceSeed[0].netPricePerUnit,
    totalAmountWithoutVat: invoiceSeed[0].totalAmountWithoutVat,
    vat: invoiceSeed[0].vat,
    url: invoiceSeed[0].url,
    nft: invoiceSeed[0].nft,
    paymentTerms: invoiceSeed[0].paymentTerms,
    serviceProcessId: invoiceSeed[0].serviceProcessId,
    serviceProcess: {
      order: {
        id: ordersSeed[0].id,
        buyerOrderRefDocumentId: ordersSeed[0].buyerOrderRefDocumentId,
      },
    },
  },
  {
    id: invoiceSeed[1].id,
    debtorId: invoiceSeed[1].debtorId,
    creditorId: invoiceSeed[1].creditorId,
    invoiceNumber: invoiceSeed[1].invoiceNumber,
    creationDate: invoiceSeed[1].creationDate,
    dueDate: invoiceSeed[1].dueDate,
    contractCurrency: invoiceSeed[1].contractCurrency,
    measuringUnit: invoiceSeed[1].measuringUnit,
    netPricePerUnit: invoiceSeed[1].netPricePerUnit,
    totalAmountWithoutVat: invoiceSeed[1].totalAmountWithoutVat,
    vat: invoiceSeed[1].vat,
    url: invoiceSeed[1].url,
    nft: invoiceSeed[1].nft,
    paymentTerms: invoiceSeed[1].paymentTerms,
    serviceProcessId: invoiceSeed[1].serviceProcessId,
    serviceProcess: {
      order: {
        id: ordersSeed[1].id,
        buyerOrderRefDocumentId: ordersSeed[1].buyerOrderRefDocumentId,
      },
    },
  },
];
