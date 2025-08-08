/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { companiesSeed, orderLinesSeed, productsSeed, serviceProcessesSeed } from '@ap3/database';
import { CreateOrderDto } from '../create-order.dto';

export const createOrderMock = [
  new CreateOrderDto(
    productsSeed[0].id,
    +orderLinesSeed[0].requestedQuantity,
    serviceProcessesSeed[0].dueYear,
    serviceProcessesSeed[0].dueCalendarWeek,
    companiesSeed[0].id,
    orderLinesSeed[0].unitOfMeasureCodeAgreed ? orderLinesSeed[0].unitOfMeasureCodeAgreed : ''
  ),
  new CreateOrderDto(
    productsSeed[0].id,
    +orderLinesSeed[1].requestedQuantity,
    serviceProcessesSeed[1].dueYear,
    serviceProcessesSeed[1].dueCalendarWeek,
    companiesSeed[1].id,
    orderLinesSeed[1].unitOfMeasureCodeAgreed ? orderLinesSeed[1].unitOfMeasureCodeAgreed : ''
  ),
];
