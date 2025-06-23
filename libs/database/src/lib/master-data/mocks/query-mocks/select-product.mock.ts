/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductsSeed } from '../../../../seed/products.seed';

export const GET_PRODUCT_BY_ID_QUERY_MOCK = { where: { id: ProductsSeed[0].id } };
