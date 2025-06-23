/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceStatesEnum } from '@ap3/util';

export class AllOrdersFilterAmqpDto {
  serviceStates?: ServiceStatesEnum[] = [];
  companyId?: string;
  customerName?: string;
  productionDateFrom?: Date;
  productionDateTo?: Date;

  constructor(
    serviceStates?: ServiceStatesEnum[],
    companyId?: string,
    customerName?: string,
    productionDateFrom?: Date,
    productionDateTo?: Date
  ) {
    if (serviceStates) {
      this.serviceStates = Array.isArray(serviceStates) ? serviceStates : [serviceStates];
    }
    this.companyId = companyId;
    this.customerName = customerName;
    this.productionDateFrom = productionDateFrom;
    this.productionDateTo = productionDateTo;
  }
}
