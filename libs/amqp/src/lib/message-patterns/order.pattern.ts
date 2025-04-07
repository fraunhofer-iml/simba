/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export enum OrderMessagePatterns {
  CREATE = 'orders/create',
  READ_BY_ID = 'orders/read-by-id',
  READ_ALL = 'orders/read-all',
  REMOVE_ORDER_BY_ID = 'orders/remove-order-by-id',
  FINISH_BY_ID = 'offers/finish'
}
