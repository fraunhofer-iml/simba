/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceProcessesSeed, ServiceStatesSeed } from '../../../../seed';
import { ServiceStatusWithOrderTypes } from '../types/service-status-with-order.types';

export const ServiceStatusWithOrderMock = <ServiceStatusWithOrderTypes[]>[
  {
    ...ServiceStatesSeed[0],
    serviceProcess: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
  },
  {
    ...ServiceStatesSeed[1],
    serviceProcess: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
  },
  {
    ...ServiceStatesSeed[2],
    serviceProcess: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
  },
];
