/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Company, Invoice, Machine, OrderLine, PaymentInformation, Product, ServiceProcess } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export type InvoiceIdTypes = { id: string };

export type InvoiceSumTotalAmountWithoutVatTypes = { _sum: { totalAmountWithoutVat: Decimal } };

export type InvoiceCountAndDueMonth = { invoice_count: number; due_month: string };

export type InvoiceForZugferd = Invoice & {
  serviceProcess:
    | (ServiceProcess & {
        order: {
          id: string;
          orderLines: (OrderLine & { item: Product })[];
        } | null;
      } & {
        machineAssignments: {
          machine: Machine;
        }[];
      })
    | null;
  debtor: (Company & { paymentInformation: PaymentInformation[] }) | null;
  creditor: (Company & { paymentInformation: PaymentInformation[] }) | null;
};
