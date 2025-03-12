/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStates } from '@ap3/util';

export class AdditionalDataDto {
  serviceProcessId: string;
  serviceProcessHash: string;
  status: PaymentStates;

  constructor(serviceProcessId: string, serviceProcessHash: string, status: PaymentStates) {
    this.serviceProcessId = serviceProcessId;
    this.serviceProcessHash = serviceProcessHash;
    this.status = status;
  }
}
