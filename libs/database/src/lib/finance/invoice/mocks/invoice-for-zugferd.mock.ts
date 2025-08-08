/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Company, OrderLine, PaymentInformation, Product, ServiceProcess } from '@prisma/client';
import { companiesSeed, invoiceSeed, orderLinesSeed, paymentInformationSeed, productsSeed, serviceProcessesSeed } from '../../../../seed';
import { InvoiceForZugferd } from '../types/invoice.types';

export const invoiceForZugferdMock: any = <InvoiceForZugferd>{
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
  serviceProcessId: invoiceSeed[0].serviceProcessId,
  serviceProcess: [serviceProcessesSeed[0]].map((serviceProcess: ServiceProcess) => ({
    ...serviceProcess,
    order: {
      orderLines: [orderLinesSeed[0]].map((orderLine: OrderLine): OrderLine & { item: Product } => ({
        ...orderLine,
        item: productsSeed[0],
      })),
    },
  }))[0],
  debtor: [companiesSeed[0]].map((company: Company) => ({
    ...company,
    paymentInformation: [paymentInformationSeed[0]],
  }))[0],
  creditor: [companiesSeed[1]].map((company: Company) => ({
    ...company,
    paymentInformation: [paymentInformationSeed[1]],
  }))[0],
};
