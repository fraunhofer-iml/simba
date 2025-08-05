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
  id: ServiceProcessesSeed[0].orderId,
  pricesPerCW: <ScheduledPricesCwDto[]>[
    {
      cw: Number(OffersSeed[0].plannedCalendarWeek),
      year: Number(OffersSeed[0].plannedYear),
      basePrice: +OffersSeed[0].basicPrice,
      utilization: +OffersSeed[0].utilization,
      timeUntilProduction: +OffersSeed[0].timeToProduction,
    },
    {
      cw: Number(OffersSeed[1].plannedCalendarWeek),
      year: Number(OffersSeed[1].plannedYear),
      basePrice: +OffersSeed[1].basicPrice,
      utilization: +OffersSeed[1].utilization,
      timeUntilProduction: +OffersSeed[1].timeToProduction,
    },
    {
      cw: Number(OffersSeed[2].plannedCalendarWeek),
      year: Number(OffersSeed[2].plannedYear),
      basePrice: +OffersSeed[2].basicPrice,
      utilization: +OffersSeed[2].utilization,
      timeUntilProduction: +OffersSeed[2].timeToProduction,
    },
    {
      cw: Number(OffersSeed[3].plannedCalendarWeek),
      year: Number(OffersSeed[3].plannedYear),
      basePrice: +OffersSeed[3].basicPrice,
      utilization: +OffersSeed[3].utilization,
      timeUntilProduction: +OffersSeed[3].timeToProduction,
    },
  ],
};
