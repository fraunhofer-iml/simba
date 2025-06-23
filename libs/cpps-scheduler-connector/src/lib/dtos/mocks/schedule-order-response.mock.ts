/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { OffersSeed, ServiceProcessesSeed } from '@ap3/database';
import { ScheduleOrderResponseDto } from '../schedule-order-response.dto';
import { ScheduledPricesCwDto } from '../scheduled-prices-cw.dto';

export const ScheduleOrderResponseMock = <ScheduleOrderResponseDto>{
  orderId: ServiceProcessesSeed[0].orderId,
  pricesPerCW: <ScheduledPricesCwDto[]>[
    {
      cw: Number(OffersSeed[0].plannedCalendarWeek),
      year: Number(OffersSeed[0].plannedYear),
      price: Number(OffersSeed[0].price),
    },
    {
      cw: Number(OffersSeed[1].plannedCalendarWeek),
      year: Number(OffersSeed[1].plannedYear),
      price: Number(OffersSeed[1].price),
    },
    {
      cw: Number(OffersSeed[2].plannedCalendarWeek),
      year: Number(OffersSeed[2].plannedYear),
      price: Number(OffersSeed[2].price),
    },
    {
      cw: Number(OffersSeed[3].plannedCalendarWeek),
      year: Number(OffersSeed[3].plannedYear),
      price: Number(OffersSeed[3].price),
    },
  ],
};
