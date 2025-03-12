/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class AllInvoicesFilterAmqpDto {
  creditorId: string;
  debtorId: string;
  paymentState: string;

  constructor(creditorId: string, debtorId: string, paymentState: string) {
    this.creditorId = creditorId;
    this.debtorId = debtorId;
    this.paymentState = paymentState;
  }
}
