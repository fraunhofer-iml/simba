/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { MachineAssignmentSeed, OffersSeed, ServiceProcessesSeed } from '@ap3/database';
import { ScheduledProductionPlanDto } from '../scheduled-production-plan.dto';

export const ScheduledProductionPlanMock = <ScheduledProductionPlanDto>{
  isOptimized: true,
  productionPlan: [
    {
      machineAssignment: [
        {
          end: MachineAssignmentSeed[0].end.toISOString(),
          machineId: MachineAssignmentSeed[0].machineId,
          start: MachineAssignmentSeed[1].end.toISOString(),
        },
      ],
      orderId: ServiceProcessesSeed[0].orderId,
      price: Number(OffersSeed[0].price),
    },
  ],
};
