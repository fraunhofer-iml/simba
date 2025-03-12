/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceProcessStatesAmqpMock } from '@ap3/amqp';
import { ServiceProcessStatusDto } from '@ap3/api';

export const ProcessStateHistoryMock = <ServiceProcessStatusDto[]>[
  { ...ServiceProcessStatesAmqpMock[0] },
  { ...ServiceProcessStatesAmqpMock[1] },
  { ...ServiceProcessStatesAmqpMock[2] },
];
