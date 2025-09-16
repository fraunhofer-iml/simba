/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScheduledProductDto } from './scheduled-product.dto';

export class ScheduleOrderRequestDto {
  id: string;
  requestedCW: number;
  buyerOrderRefDocumentId: string;
  requestedYear: number;
  timestamp: Date;
  products: ScheduledProductDto[];

  constructor(
    id: string,
    buyerOrderRefDocumentId: string,
    requestedCW: number,
    requestedYear: number,
    timestamp: Date,
    products: ScheduledProductDto[]
  ) {
    this.id = id;
    this.buyerOrderRefDocumentId = buyerOrderRefDocumentId;
    this.requestedCW = requestedCW;
    this.requestedYear = requestedYear;
    this.timestamp = timestamp;
    this.products = products;
  }
}
