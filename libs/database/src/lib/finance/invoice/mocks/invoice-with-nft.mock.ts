/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceSeed, OrdersSeed, TradeReceivablesSeed } from '../../../../seed';
import { InvoiceWithNFT } from '../types';

export const InvoiceNFTPrismaMock: any[] = <InvoiceWithNFT[]>[
  {
    id: InvoiceSeed[0].id,
    debtorId: InvoiceSeed[0].debtorId,
    creditorId: InvoiceSeed[0].creditorId,
    invoiceNumber: InvoiceSeed[0].invoiceNumber,
    creationDate: InvoiceSeed[0].creationDate,
    dueDate: InvoiceSeed[0].dueDate,
    contractCurrency: InvoiceSeed[0].contractCurrency,
    measuringUnit: InvoiceSeed[0].measuringUnit,
    netPricePerUnit: InvoiceSeed[0].netPricePerUnit,
    totalAmountWithoutVat: InvoiceSeed[0].totalAmountWithoutVat,
    vat: InvoiceSeed[0].vat,
    url: InvoiceSeed[0].url,
    paymentTerms: InvoiceSeed[0].paymentTerms,
    serviceProcessId: InvoiceSeed[0].serviceProcessId,
    serviceProcess: {
      order: {
        id: OrdersSeed[0].id,
        buyerOrderRefDocumentId: OrdersSeed[0].buyerOrderRefDocumentId,
      },
    },
    tradeReceivable: {
      id: TradeReceivablesSeed[0].id,
      nft: TradeReceivablesSeed[0].nft,
    },
  },
  {
    id: InvoiceSeed[1].id,
    debtorId: InvoiceSeed[1].debtorId,
    creditorId: InvoiceSeed[1].creditorId,
    invoiceNumber: InvoiceSeed[1].invoiceNumber,
    creationDate: InvoiceSeed[1].creationDate,
    dueDate: InvoiceSeed[1].dueDate,
    contractCurrency: InvoiceSeed[1].contractCurrency,
    measuringUnit: InvoiceSeed[1].measuringUnit,
    netPricePerUnit: InvoiceSeed[1].netPricePerUnit,
    totalAmountWithoutVat: InvoiceSeed[1].totalAmountWithoutVat,
    vat: InvoiceSeed[1].vat,
    url: InvoiceSeed[1].url,
    paymentTerms: InvoiceSeed[1].paymentTerms,
    serviceProcessId: InvoiceSeed[1].serviceProcessId,
    serviceProcess: {
      order: {
        id: OrdersSeed[1].id,
        buyerOrderRefDocumentId: OrdersSeed[1].buyerOrderRefDocumentId,
      },
    },
    tradeReceivable: {
      id: TradeReceivablesSeed[1].id,
      nft: TradeReceivablesSeed[1].nft,
    },
  },
];
