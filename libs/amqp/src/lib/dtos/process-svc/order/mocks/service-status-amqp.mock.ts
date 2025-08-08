/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { serviceStatesSeed } from '@ap3/database';
import { ServiceStatusAmqpDto } from '../index';

export const ServiceStatusAmqpDtoMock: ServiceStatusAmqpDto[] = [
  new ServiceStatusAmqpDto(serviceStatesSeed[0].status, serviceStatesSeed[0].timestamp.toISOString()),
  new ServiceStatusAmqpDto(serviceStatesSeed[1].status, serviceStatesSeed[1].timestamp.toISOString()),
];
