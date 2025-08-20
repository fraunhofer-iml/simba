/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class NotPaidStatisticsAmqpDto {
  overdueInvoiceCount: number;
  overdueInvoiceValue: number;
  outstandingInvoiceCount: number;
  outstandingInvoiceValue: number;

  constructor(overdueInvoiceCount: number, overdueInvoiceValue: number, outstandingInvoiceCount: number, outstandingInvoiceValue: number) {
    this.overdueInvoiceCount = overdueInvoiceCount;
    this.overdueInvoiceValue = overdueInvoiceValue;
    this.outstandingInvoiceCount = outstandingInvoiceCount;
    this.outstandingInvoiceValue = outstandingInvoiceValue;
  }
}
