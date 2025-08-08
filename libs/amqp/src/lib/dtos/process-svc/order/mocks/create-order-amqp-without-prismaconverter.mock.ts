/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { companiesSeed, orderLinesSeed, ordersSeed, productsSeed, serviceProcessesSeed } from '@ap3/database';
import { CreateOrderAmqpDto } from '../index';

export const createOrderAmqpDtoWithoutPrismaConverterMock: CreateOrderAmqpDto = <CreateOrderAmqpDto>{
  productId: productsSeed[0].id,
  quantity: +orderLinesSeed[0].requestedQuantity,
  requestedYear: serviceProcessesSeed[0].dueYear,
  requestedCalendarWeek: serviceProcessesSeed[0].dueCalendarWeek,
  customerId: companiesSeed[0].id,
  vatCurrency: ordersSeed[0].vatCurrency,
  buyerId: companiesSeed[0].id,
  sellerId: companiesSeed[1].id,
  unitOfMeasureCode: 'Stück',
};
