/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { companiesSeed, invoiceSeed, machinesSeed, orderLinesSeed, ordersSeed, serviceStatesSeed } from '@ap3/database';
import { offerDtosMock } from '../../offer';
import { productDtoMocks } from '../../product';
import { OrderOverviewDto } from '../order-overview.dto';

export const orderOverviewMock: OrderOverviewDto[] = [
  {
    id: ordersSeed[0].id,
    number: ordersSeed[0].buyerOrderRefDocumentId ? ordersSeed[0].buyerOrderRefDocumentId : '',
    product: productDtoMocks[0].name,
    amount: +orderLinesSeed[0].requestedQuantity,
    year: offerDtosMock[0].plannedYear,
    calendarWeek: offerDtosMock[0].plannedCalendarWeek,
    status: serviceStatesSeed[0].status,
    statusTimestamp: serviceStatesSeed[0].timestamp.toISOString(),
    price: offerDtosMock[0].basicPrice + offerDtosMock[0].utilization + offerDtosMock[0].timeUntilProduction,
    robots: [machinesSeed[0].id, machinesSeed[1].id],
    customerId: companiesSeed[0].id,
    customerName: companiesSeed[0].name,
    contractorId: companiesSeed[1].id,
    contractorName: companiesSeed[1].name,
    currency: ordersSeed[0].vatCurrency,
    invoiceNumber: invoiceSeed[0].invoiceNumber,
  },
  {
    id: ordersSeed[1].id,
    number: ordersSeed[1].buyerOrderRefDocumentId ? ordersSeed[1].buyerOrderRefDocumentId : '',
    product: productDtoMocks[0].name,
    amount: +orderLinesSeed[1].requestedQuantity,
    year: offerDtosMock[1].plannedYear,
    calendarWeek: offerDtosMock[1].plannedCalendarWeek,
    status: serviceStatesSeed[5].status,
    statusTimestamp: serviceStatesSeed[5].timestamp.toISOString(),
    price: offerDtosMock[1].basicPrice + offerDtosMock[1].utilization + offerDtosMock[1].timeUntilProduction,
    robots: [machinesSeed[0].id, machinesSeed[1].id],
    customerId: ordersSeed[1].buyerId,
    customerName: companiesSeed[0].name,
    contractorId: companiesSeed[1].id,
    contractorName: companiesSeed[1].name,
    currency: ordersSeed[1].vatCurrency,
    invoiceNumber: invoiceSeed[1].invoiceNumber,
  },
];
