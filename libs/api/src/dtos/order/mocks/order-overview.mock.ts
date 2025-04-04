/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CompaniesSeed,
  InvoiceSeed,
  MachinesSeed,
  OrderLinesSeed,
  OrdersSeed,
  ServiceProcessesSeed,
  ServiceStatesSeed,
} from '@ap3/database';
import { OpenOffersMock } from '../../offer';
import { ProductDtoMocks } from '../../product';
import { OrderOverviewDto } from '../order-overview.dto';

export const OrderOverviewMock: OrderOverviewDto[] = [
  {
    id: OrdersSeed[0].id,
    number: OrdersSeed[0].buyerOrderRefDocumentId ? OrdersSeed[0].buyerOrderRefDocumentId : '',
    product: ProductDtoMocks[0].name,
    amount: +OrderLinesSeed[0].requestedQuantity,
    year: OpenOffersMock[0].plannedYear,
    calendarWeek: OpenOffersMock[0].plannedCalendarWeek,
    status: ServiceStatesSeed[0].status,
    statusTimestamp: ServiceStatesSeed[0].timestamp.toISOString(),
    price: OpenOffersMock[0].price,
    robots: [MachinesSeed[0].id, MachinesSeed[1].id],
    customerId: CompaniesSeed[0].id,
    customerName: CompaniesSeed[0].name,
    currency: OrdersSeed[0].vatCurrency,
    invoiceNumber: InvoiceSeed[0].invoiceNumber,
  },
  {
    id: OrdersSeed[1].id,
    number: OrdersSeed[1].buyerOrderRefDocumentId ? OrdersSeed[1].buyerOrderRefDocumentId : '',
    product: ProductDtoMocks[0].name,
    amount: +OrderLinesSeed[1].requestedQuantity,
    year: OpenOffersMock[1].plannedYear,
    calendarWeek: OpenOffersMock[1].plannedCalendarWeek,
    status: ServiceStatesSeed[5].status,
    statusTimestamp: ServiceStatesSeed[5].timestamp.toISOString(),
    price: OpenOffersMock[1].price,
    robots: [MachinesSeed[0].id, MachinesSeed[1].id],
    customerId: OrdersSeed[1].buyerId,
    customerName: CompaniesSeed[0].name,
    currency: OrdersSeed[1].vatCurrency,
    invoiceNumber: InvoiceSeed[2].invoiceNumber,
  },
];
