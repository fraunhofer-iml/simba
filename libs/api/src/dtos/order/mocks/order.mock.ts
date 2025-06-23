/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CompaniesSeed,
  MachinesSeed,
  OffersSeed,
  OrderLinesSeed,
  OrdersSeed,
  ProductsSeed,
  ServiceProcessesSeed,
  ServiceStatesSeed,
  TradeReceivablesSeed,
} from '@ap3/database';
import { OrderDto } from '../order.dto';

export const OrderDtosMock: OrderDto[] = [
  new OrderDto(
    OrdersSeed[0].id,
    ProductsSeed[0].id,
    +OrderLinesSeed[0].requestedQuantity,
    ServiceProcessesSeed[0].dueYear,
    ServiceProcessesSeed[0].dueCalendarWeek,
    OrdersSeed[0].documentIssueDate.toISOString(),
    ServiceStatesSeed[1].status,
    OffersSeed[0].id,
    [OffersSeed[0].id, OffersSeed[1].id, OffersSeed[2].id, OffersSeed[3].id],
    [MachinesSeed[0].id, MachinesSeed[1].id],
    CompaniesSeed[0].id,
    TradeReceivablesSeed[0].id
  ),
  new OrderDto(
    OrdersSeed[1].id,
    ProductsSeed[0].id,
    +OrderLinesSeed[1].requestedQuantity,
    ServiceProcessesSeed[1].dueYear,
    ServiceProcessesSeed[1].dueCalendarWeek,
    OrdersSeed[1].documentIssueDate.toISOString(),
    ServiceStatesSeed[4].status,
    '',
    [],
    [],
    CompaniesSeed[0].id,
    ''
  ),
];
