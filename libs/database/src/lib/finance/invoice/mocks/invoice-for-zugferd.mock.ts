/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Company, OrderLine, PaymentInformation, Product, ServiceProcess } from '@prisma/client';
import { CompaniesSeed, InvoiceSeed, OrderLinesSeed, PaymentInformationSeed, ProductsSeed, ServiceProcessesSeed } from '../../../../seed';
import { InvoiceForZugferd } from '../types/invoice.types';

export const InvoiceForZugferdMock: any = <InvoiceForZugferd>{
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
  serviceProcessId: InvoiceSeed[0].serviceProcessId,
  serviceProcess: [ServiceProcessesSeed[0]].map((serviceProcess: ServiceProcess) => ({
    ...serviceProcess,
    order: {
      orderLines: [OrderLinesSeed[0]].map((orderLine: OrderLine): OrderLine & { item: Product } => ({
        ...orderLine,
        item: ProductsSeed[0],
      })),
    },
  }))[0],
  debtor: [CompaniesSeed[0]].map((company: Company) => ({
    ...company,
    paymentInformation: [PaymentInformationSeed[0]],
  }))[0],
  creditor: [CompaniesSeed[1]].map((company: Company) => ({
    ...company,
    paymentInformation: [PaymentInformationSeed[1]],
  }))[0],
};
