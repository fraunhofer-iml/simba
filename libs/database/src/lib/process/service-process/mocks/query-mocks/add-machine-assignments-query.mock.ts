/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prisma } from '@prisma/client';
import { machineAssignmentSeed, ordersSeed } from '../../../../../seed';

const assignFirstTwo = [
  {
    machineId: machineAssignmentSeed[0].machineId,
    start: machineAssignmentSeed[0].start,
    end: machineAssignmentSeed[0].end,
  },
  {
    machineId: machineAssignmentSeed[1].machineId,
    start: machineAssignmentSeed[1].start,
    end: machineAssignmentSeed[1].end,
  },
];

const assignThird = [
  {
    machineId: machineAssignmentSeed[2].machineId,
    start: machineAssignmentSeed[2].start,
    end: machineAssignmentSeed[2].end,
  },
];

export const AddMachineAssignmentsQuery = <Prisma.ServiceProcessUpdateInput>{
  where: { orderId: ordersSeed[0].id },
  data: {
    machineAssignments: {
      createMany: {
        data: assignFirstTwo,
      },
    },
  },
};
export const AddMachineAssignmentsQuery2 = <Prisma.ServiceProcessUpdateInput>{
  where: { orderId: ordersSeed[2].id },
  data: {
    machineAssignments: {
      createMany: {
        data: assignThird,
      },
    },
  },
};
