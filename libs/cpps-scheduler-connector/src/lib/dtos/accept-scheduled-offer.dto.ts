/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScheduledProductDto } from './scheduled-product.dto';

export class AcceptScheduledOfferDto {
  cw: number;
  year: number;
  product: ScheduledProductDto;
  message?: string;

  constructor(cw: number, year: number, product: ScheduledProductDto, message?: string) {
    this.cw = cw;
    this.year = year;
    this.product = product;
    this.message = message;
  }
}
