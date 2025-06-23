/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class ScheduledPricesCwDto {
  cw: number;
  year: number;
  price: number;

  constructor(cw: number, year: number, price: number) {
    this.cw = cw;
    this.year = year;
    this.price = price;
  }
}
