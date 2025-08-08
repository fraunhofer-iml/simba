/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { productsSeed } from '@ap3/database';
import { ProductAmqpDto } from '../product-amqp.dto';

export const productAmqpMock = <ProductAmqpDto[]>[{ id: productsSeed[0].id, name: productsSeed[0].name, variant: productsSeed[0].variant }];
