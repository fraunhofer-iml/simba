/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { MachineAssignmentAmqpDto } from '@ap3/amqp';
import { machineAssignmentSeed, ordersSeed } from '@ap3/database';

export const machineAssignmentAMQPMock = <MachineAssignmentAmqpDto[]>[
  {
    orderId: ordersSeed[0].id,
    machineId: machineAssignmentSeed[0].machineId,
    start: new Date(machineAssignmentSeed[0].start),
    end: new Date(machineAssignmentSeed[0].end),
  },
  {
    orderId: ordersSeed[0].id,
    machineId: machineAssignmentSeed[1].machineId,
    start: new Date(machineAssignmentSeed[1].start),
    end: new Date(machineAssignmentSeed[1].end),
  },
  {
    orderId: ordersSeed[2].id,
    machineId: machineAssignmentSeed[2].machineId,
    start: new Date(machineAssignmentSeed[2].start),
    end: new Date(machineAssignmentSeed[2].end),
  },
];
