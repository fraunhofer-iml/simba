/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { productsSeed } from '@ap3/database';
import { ProductAmqpDto } from '../product-amqp.dto';

export const productAmqpMock = <ProductAmqpDto[]>[
  { id: productsSeed[0].id, name: productsSeed[0].name, variant: productsSeed[0].variant },
  { id: productsSeed[1].id, name: productsSeed[1].name, variant: productsSeed[1].variant },
  { id: productsSeed[2].id, name: productsSeed[2].name, variant: productsSeed[2].variant },
  { id: productsSeed[3].id, name: productsSeed[3].name, variant: productsSeed[3].variant },
];
