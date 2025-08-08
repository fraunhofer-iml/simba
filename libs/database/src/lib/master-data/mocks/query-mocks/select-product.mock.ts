/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { productsSeed } from '../../../../seed/products.seed';

export const getProductByIdQueryMock = { where: { id: productsSeed[0].id } };
