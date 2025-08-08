/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceProcessStatusAmqpDto } from '@ap3/amqp';
import { serviceProcessesSeed, serviceStatesSeed } from '@ap3/database';

export const serviceProcessStatesAmqpMock = <ServiceProcessStatusAmqpDto[]>[
  { orderId: serviceProcessesSeed[0].orderId, status: serviceStatesSeed[0].status, timestamp: serviceStatesSeed[0].timestamp },
  {
    orderId: serviceProcessesSeed[0].orderId,
    status: serviceStatesSeed[1].status,
    timestamp: serviceStatesSeed[1].timestamp,
  },
  {
    orderId: serviceProcessesSeed[0].orderId,
    status: serviceStatesSeed[2].status,
    timestamp: serviceStatesSeed[2].timestamp,
  },
];
