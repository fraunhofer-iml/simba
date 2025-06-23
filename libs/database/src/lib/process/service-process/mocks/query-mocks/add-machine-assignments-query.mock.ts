/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prisma } from '@prisma/client';
import { MachineAssignmentSeed, OrdersSeed } from '../../../../../seed';

const assignFirstTwo = [
  {
    machineId: MachineAssignmentSeed[0].machineId,
    start: MachineAssignmentSeed[0].start,
    end: MachineAssignmentSeed[0].end,
  },
  {
    machineId: MachineAssignmentSeed[1].machineId,
    start: MachineAssignmentSeed[1].start,
    end: MachineAssignmentSeed[1].end,
  },
];

const assignThird = [
  {
    machineId: MachineAssignmentSeed[2].machineId,
    start: MachineAssignmentSeed[2].start,
    end: MachineAssignmentSeed[2].end,
  },
];

export const AddMachineAssignmentsQuery = <Prisma.ServiceProcessUpdateInput>{
  where: { orderId: OrdersSeed[0].id },
  data: {
    machineAssignments: {
      createMany: {
        data: assignFirstTwo,
      },
    },
  },
};
export const AddMachineAssignmentsQuery2 = <Prisma.ServiceProcessUpdateInput>{
  where: { orderId: OrdersSeed[2].id },
  data: {
    machineAssignments: {
      createMany: {
        data: assignThird,
      },
    },
  },
};
