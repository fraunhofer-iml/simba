/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { serviceProcessesSeed, serviceStatesSeed } from '../../../../seed';
import { ServiceStatusWithOrderTypes } from '../types/service-status-with-order.types';

export const serviceStatusWithOrderMock = <ServiceStatusWithOrderTypes[]>[
  {
    ...serviceStatesSeed[0],
    serviceProcess: {
      orderId: serviceProcessesSeed[0].orderId,
    },
  },
  {
    ...serviceStatesSeed[1],
    serviceProcess: {
      orderId: serviceProcessesSeed[0].orderId,
    },
  },
  {
    ...serviceStatesSeed[2],
    serviceProcess: {
      orderId: serviceProcessesSeed[0].orderId,
    },
  },
];
