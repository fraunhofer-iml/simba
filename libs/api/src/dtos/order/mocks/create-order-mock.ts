/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompaniesSeed, OrderLinesSeed, ProductsSeed, ServiceProcessesSeed } from '@ap3/database';
import { CreateOrderDto } from '../create-order.dto';

export const createOrderMock = [
  new CreateOrderDto(
    ProductsSeed[0].id,
    +OrderLinesSeed[0].requestedQuantity,
    ServiceProcessesSeed[0].dueYear,
    ServiceProcessesSeed[0].dueCalendarWeek,
    CompaniesSeed[0].id,
    OrderLinesSeed[0].unitOfMeasureCodeAgreed ? OrderLinesSeed[0].unitOfMeasureCodeAgreed : ''
  ),
  new CreateOrderDto(
    ProductsSeed[0].id,
    +OrderLinesSeed[1].requestedQuantity,
    ServiceProcessesSeed[1].dueYear,
    ServiceProcessesSeed[1].dueCalendarWeek,
    CompaniesSeed[1].id,
    OrderLinesSeed[1].unitOfMeasureCodeAgreed ? OrderLinesSeed[1].unitOfMeasureCodeAgreed : ''
  ),
];
