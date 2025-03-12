/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export enum OfferMessagePatterns{
  CREATE = 'offers/create',
  READ_ALL = 'offers/read-all',
  READ_BY_ID = 'offers/read-by-id',
  READ_BY_ORDER_ID = 'offers/read-by-order-id',
  ACCEPT_BY_ID = 'offers/accept',
  DECLINE_ALL_OF_ORDER = 'offers/decline'
}
