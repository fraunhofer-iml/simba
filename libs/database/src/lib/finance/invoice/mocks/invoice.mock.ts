/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prisma } from '@prisma/client';
import { InvoiceIdTypes } from '../types/invoice.types';

export const PaidInvoiceIdsSeptember: any[] = <InvoiceIdTypes[]>[{ id: 'IV004' }];
export const PaidInvoiceIdsNovember: any[] = <InvoiceIdTypes[]>[{ id: 'IV001' }, { id: 'IV002' }, { id: 'IV003' }];
export const DueInvoiceCount: any[] = [
  { invoice_count: 1n, due_month: '2024-09' },
  { invoice_count: 3n, due_month: '2024-10' },
];
export const PaidOnTimeInvoiceCount: any[] = [
  { invoice_count: 1n, due_month: '2024-09' },
  { invoice_count: 2n, due_month: '2024-10' },
];

export const AggregationSumSeptember: any = {
  _sum: { totalAmountWithoutVat: new Prisma.Decimal(6) },
  _count: null,
  _avg: null,
  _min: null,
  _max: null,
};
export const AggregationSumNovember: any = {
  _sum: { totalAmountWithoutVat: new Prisma.Decimal(15) },
  _count: null,
  _avg: null,
  _min: null,
  _max: null,
};
