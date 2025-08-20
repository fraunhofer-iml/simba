/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  companiesSeed,
  invoiceSeed,
  machinesSeed,
  offersSeed,
  orderLinesSeed,
  ordersSeed,
  productsSeed,
  serviceProcessesSeed,
  serviceStatesSeed,
} from '@ap3/database';
import { OrderDto } from '../order.dto';

export const orderDtosMock: OrderDto[] = [
  new OrderDto(
    ordersSeed[0].id,
    productsSeed[0].id,
    +orderLinesSeed[0].requestedQuantity,
    serviceProcessesSeed[0].dueYear,
    serviceProcessesSeed[0].dueCalendarWeek,
    ordersSeed[0].documentIssueDate.toISOString(),
    serviceStatesSeed[1].status,
    offersSeed[0].id,
    [offersSeed[0].id, offersSeed[1].id, offersSeed[2].id, offersSeed[3].id],
    [machinesSeed[0].id, machinesSeed[1].id],
    companiesSeed[0].id,
    invoiceSeed[0].id
  ),
  new OrderDto(
    ordersSeed[1].id,
    productsSeed[0].id,
    +orderLinesSeed[1].requestedQuantity,
    serviceProcessesSeed[1].dueYear,
    serviceProcessesSeed[1].dueCalendarWeek,
    ordersSeed[1].documentIssueDate.toISOString(),
    serviceStatesSeed[4].status,
    '',
    [],
    [],
    companiesSeed[0].id,
    ''
  ),
];
