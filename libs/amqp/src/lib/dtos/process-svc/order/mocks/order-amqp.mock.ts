/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompaniesSeed, MachinesSeed, OrderLinesSeed, OrdersSeed, ServiceProcessesSeed, ServiceStatesSeed } from '@ap3/database';
import { OfferAmqpMock } from '../../offer';
import { ServiceStatusAmqpDto } from '../index';
import { OrderAmqpDto } from '../order-amqp.dto';

export const OrderAmqpMock = <OrderAmqpDto[]>[
  {
    id: OrdersSeed[0].id,
    number: OrdersSeed[0].buyerOrderRefDocumentId,
    productId: OrderLinesSeed[0].itemId,
    quantity: +OrderLinesSeed[0].requestedQuantity,
    requestedYear: ServiceProcessesSeed[0].dueYear,
    requestedCalendarWeek: ServiceProcessesSeed[0].dueCalendarWeek,
    creationDate: new Date(ServiceStatesSeed[0].timestamp).toISOString(),
    status: new ServiceStatusAmqpDto(ServiceStatesSeed[0].status, new Date(ServiceStatesSeed[0].timestamp).toISOString()),
    acceptedOfferId: undefined,
    offerIds: [],
    robots: [MachinesSeed[0].id, MachinesSeed[1].id],
    customerId: OrdersSeed[0].buyerId,
    tradeReceivableIds: [],
    currency: OrdersSeed[0].vatCurrency,
    contractorId: OrdersSeed[0].sellerId,
    contractorName: CompaniesSeed[1].name,
  },
  {
    id: OrdersSeed[1].id,
    number: OrdersSeed[1].buyerOrderRefDocumentId,
    productId: OrderLinesSeed[1].itemId,
    quantity: +OrderLinesSeed[1].requestedQuantity,
    requestedYear: ServiceProcessesSeed[1].dueYear,
    requestedCalendarWeek: ServiceProcessesSeed[1].dueCalendarWeek,
    creationDate: new Date(ServiceStatesSeed[4].timestamp).toISOString(),
    status: new ServiceStatusAmqpDto(ServiceStatesSeed[5].status, new Date(ServiceStatesSeed[5].timestamp).toISOString()),
    acceptedOfferId: OfferAmqpMock[1].id,
    offerIds: [],
    robots: [MachinesSeed[0].id, MachinesSeed[1].id],
    customerId: OrdersSeed[1].buyerId,
    tradeReceivableIds: [],
    currency: OrdersSeed[1].vatCurrency,
    contractorId: OrdersSeed[1].sellerId,
    contractorName: CompaniesSeed[1].name,
  },
];
