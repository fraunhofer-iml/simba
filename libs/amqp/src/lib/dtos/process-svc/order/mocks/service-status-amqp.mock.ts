/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceStatesSeed } from '@ap3/database';
import { ServiceStatusAmqpDto } from '../index';

export const ServiceStatusAmqpDtoMock: ServiceStatusAmqpDto[] = [
  new ServiceStatusAmqpDto(ServiceStatesSeed[0].status, ServiceStatesSeed[0].timestamp.toISOString()),
  new ServiceStatusAmqpDto(ServiceStatesSeed[1].status, ServiceStatesSeed[1].timestamp.toISOString()),
];
