/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScheduledPricesCwDto } from './scheduled-prices-cw.dto';

export class ScheduleOrderResponseDto {
  id: string;
  pricesPerCW: ScheduledPricesCwDto[];

  constructor(orderId: string, pricesPerCW: ScheduledPricesCwDto[]) {
    this.id = orderId;
    this.pricesPerCW = pricesPerCW;
  }
}
