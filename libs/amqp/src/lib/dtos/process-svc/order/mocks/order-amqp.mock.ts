/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { companiesSeed, machinesSeed, orderLinesSeed, ordersSeed, serviceProcessesSeed, serviceStatesSeed } from '@ap3/database';
import { offerAmqpMock } from '../../offer';
import { ServiceStatusAmqpDto } from '../index';
import { OrderAmqpDto } from '../order-amqp.dto';

export const orderAmqpMock = <OrderAmqpDto[]>[
  {
    id: ordersSeed[0].id,
    number: ordersSeed[0].buyerOrderRefDocumentId,
    productId: orderLinesSeed[0].itemId,
    quantity: +orderLinesSeed[0].requestedQuantity,
    requestedYear: serviceProcessesSeed[0].dueYear,
    requestedCalendarWeek: serviceProcessesSeed[0].dueCalendarWeek,
    creationDate: new Date(serviceStatesSeed[0].timestamp).toISOString(),
    status: new ServiceStatusAmqpDto(serviceStatesSeed[0].status, new Date(serviceStatesSeed[0].timestamp).toISOString()),
    acceptedOfferId: undefined,
    offerIds: [],
    robots: [machinesSeed[0].id, machinesSeed[1].id],
    customerId: ordersSeed[0].buyerId,
    invoiceIds: [],
    currency: ordersSeed[0].vatCurrency,
    contractorId: ordersSeed[0].sellerId,
    contractorName: companiesSeed[1].name,
  },
  {
    id: ordersSeed[1].id,
    number: ordersSeed[1].buyerOrderRefDocumentId,
    productId: orderLinesSeed[1].itemId,
    quantity: +orderLinesSeed[1].requestedQuantity,
    requestedYear: serviceProcessesSeed[1].dueYear,
    requestedCalendarWeek: serviceProcessesSeed[1].dueCalendarWeek,
    creationDate: new Date(serviceStatesSeed[4].timestamp).toISOString(),
    status: new ServiceStatusAmqpDto(serviceStatesSeed[5].status, new Date(serviceStatesSeed[5].timestamp).toISOString()),
    acceptedOfferId: offerAmqpMock[1].id,
    offerIds: [],
    robots: [machinesSeed[0].id, machinesSeed[1].id],
    customerId: ordersSeed[1].buyerId,
    invoiceIds: [],
    currency: ordersSeed[1].vatCurrency,
    contractorId: ordersSeed[1].sellerId,
    contractorName: companiesSeed[1].name,
  },
];
