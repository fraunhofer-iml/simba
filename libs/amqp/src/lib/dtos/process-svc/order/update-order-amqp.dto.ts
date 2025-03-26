/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PickType } from '@nestjs/swagger';
import { OrderAmqpDto } from './order-amqp.dto';

export class UpdateOrderAmqpDto extends PickType(OrderAmqpDto, [
  'id',
  'productId',
  'quantity',
  'requestedYear',
  'requestedCalendarWeek',
  'customerId',
]) {}
