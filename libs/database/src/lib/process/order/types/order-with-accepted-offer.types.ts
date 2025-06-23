/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Offer, Order, OrderLine, ServiceStatus } from '@prisma/client';

export type OrderWithAcceptedOffer = Order & {
  orderLines: OrderLine[] | null;
} & {
  serviceProcess: {
    acceptedOffer: Offer | null;
    states: ServiceStatus[] | null;
  } | null;
};
