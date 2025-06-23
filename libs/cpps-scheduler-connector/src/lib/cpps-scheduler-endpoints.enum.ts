/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export const POST_SCHEDULE_ORDER = `/orders`;
export const PUT_ACCEPT_OFFER = (orderId: string): string => `/orders/${orderId}/accept`;
export const GET_CURRENCT_SCHEDULING = `/orders/scheduling`;
