/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OffersSeed, ServiceProcessesSeed } from '@ap3/database';
import { ScheduleOrderResponseDto } from '../schedule-order-response.dto';

export const ScheduleOrderResponseMock = <ScheduleOrderResponseDto>{
  orderId: ServiceProcessesSeed[0].orderId,
  pricesPerCW: [
    {
      cw: Number(OffersSeed[0].plannedCalendarWeek),
      price: Number(OffersSeed[0].price),
    },
    {
      cw: Number(OffersSeed[1].plannedCalendarWeek),
      price: Number(OffersSeed[1].price),
    },
    {
      cw: Number(OffersSeed[2].plannedCalendarWeek),
      price: Number(OffersSeed[2].price),
    },
    {
      cw: Number(OffersSeed[3].plannedCalendarWeek),
      price: Number(OffersSeed[3].price),
    },
  ],
};
