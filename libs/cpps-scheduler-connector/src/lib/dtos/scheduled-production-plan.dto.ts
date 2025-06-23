/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CurrentSchedulingDto } from "./current-scheduling.dto";

export class ScheduledProductionPlanDto{
  isOptimized: boolean;
  productionPlan: CurrentSchedulingDto[];

  constructor(isOptimized: boolean, productionPlan: []) {
    this.isOptimized = isOptimized;
    this.productionPlan = productionPlan;
  }
}
