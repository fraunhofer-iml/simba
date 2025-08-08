/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { offersSeed, serviceProcessesSeed } from '@ap3/database';
import { ScheduleOrderResponseDto } from '../schedule-order-response.dto';
import { ScheduledPricesCwDto } from '../scheduled-prices-cw.dto';

export const scheduleOrderResponseMock = <ScheduleOrderResponseDto>{
  id: serviceProcessesSeed[0].orderId,
  pricesPerCW: <ScheduledPricesCwDto[]>[
    {
      cw: Number(offersSeed[0].plannedCalendarWeek),
      year: Number(offersSeed[0].plannedYear),
      basePrice: +offersSeed[0].basicPrice,
      utilization: +offersSeed[0].utilization,
      timeUntilProduction: +offersSeed[0].timeToProduction,
    },
    {
      cw: Number(offersSeed[1].plannedCalendarWeek),
      year: Number(offersSeed[1].plannedYear),
      basePrice: +offersSeed[1].basicPrice,
      utilization: +offersSeed[1].utilization,
      timeUntilProduction: +offersSeed[1].timeToProduction,
    },
    {
      cw: Number(offersSeed[2].plannedCalendarWeek),
      year: Number(offersSeed[2].plannedYear),
      basePrice: +offersSeed[2].basicPrice,
      utilization: +offersSeed[2].utilization,
      timeUntilProduction: +offersSeed[2].timeToProduction,
    },
    {
      cw: Number(offersSeed[3].plannedCalendarWeek),
      year: Number(offersSeed[3].plannedYear),
      basePrice: +offersSeed[3].basicPrice,
      utilization: +offersSeed[3].utilization,
      timeUntilProduction: +offersSeed[3].timeToProduction,
    },
  ],
};
