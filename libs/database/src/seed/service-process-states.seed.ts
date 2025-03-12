/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceStatesEnum } from '../../../util/src';
import { ServiceStatus } from '@prisma/client';

export const ServiceStatesSeed = <ServiceStatus[]>[
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-09T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-09T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-09T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp001',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-09T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.SCHEDULED,
    timestamp: new Date('2024-10-02T09:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp002',
    status: ServiceStatesEnum.PRODUCED,
    timestamp: new Date('2024-10-02T10:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp003',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp003',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp004',
    status: ServiceStatesEnum.OPEN,
    timestamp: new Date('2024-10-02T07:55:55.695Z'),
  },
  {
    serviceProcessId: 'sp004',
    status: ServiceStatesEnum.PLANNED,
    timestamp: new Date('2024-10-02T08:55:55.695Z'),
  },
];
