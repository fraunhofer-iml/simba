/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompaniesSeed, createOrderQueryMock, OrderLinesSeed, OrdersSeed, ProductsSeed, ServiceProcessesSeed } from '@ap3/database';
import { CreateOrderAmqpDto } from '../create-order-amqp.dto';

export const CreateOrderAmqpDtoMock: any = <CreateOrderAmqpDto>{
  productId: ProductsSeed[0].id,
  quantity: +OrderLinesSeed[0].requestedQuantity,
  requestedYear: ServiceProcessesSeed[0].dueYear,
  requestedCalendarWeek: ServiceProcessesSeed[0].dueCalendarWeek,
  customerId: CompaniesSeed[0].id,
  vatCurrency: OrdersSeed[0].vatCurrency,
  buyerId: CompaniesSeed[0].id,
  sellerId: CompaniesSeed[1].id,
  toPrismaCreateEntity() {
    return createOrderQueryMock;
  },
};
