/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductsSeed } from '@ap3/database';
import { ProductAmqpDto } from '../product-amqp.dto';

export const ProductAmqpMock = <ProductAmqpDto[]>[{ id: ProductsSeed[0].id, name: ProductsSeed[0].name, variant: ProductsSeed[0].variant }];
