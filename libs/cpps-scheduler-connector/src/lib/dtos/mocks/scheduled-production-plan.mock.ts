/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { machineAssignmentSeed, offersSeed, serviceProcessesSeed } from '@ap3/database';
import { ScheduledProductionPlanDto } from '../scheduled-production-plan.dto';

export const scheduledProductionPlanMock = <ScheduledProductionPlanDto>{
  isOptimized: true,
  productionPlan: [
    {
      machineAssignment: [
        {
          end: machineAssignmentSeed[0].end.toISOString(),
          machineId: machineAssignmentSeed[0].machineId,
          start: machineAssignmentSeed[1].end.toISOString(),
        },
      ],
      orderId: serviceProcessesSeed[0].orderId,
      price: +offersSeed[0].basicPrice + +offersSeed[0].utilization + +offersSeed[0].timeToProduction,
    },
  ],
};
