/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class NotPaidStatisticsAmqpDto {
  overdueTradeReceivableCount: number;
  overdueTradeReceivableValue: number;
  outstandingTradeReceivableCount: number;
  outstandingTradeReceivableValue: number;

  constructor(
    overdueTradeReceivableCount: number,
    overdueTradeReceivableValue: number,
    outstandingTradeReceivableCount: number,
    outstandingTradeReceivableValue: number
  ) {
    this.overdueTradeReceivableCount = overdueTradeReceivableCount;
    this.overdueTradeReceivableValue = overdueTradeReceivableValue;
    this.outstandingTradeReceivableCount = outstandingTradeReceivableCount;
    this.outstandingTradeReceivableValue = outstandingTradeReceivableValue;
  }
}
