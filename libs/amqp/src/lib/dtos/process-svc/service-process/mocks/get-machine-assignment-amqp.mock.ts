/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompaniesSeed, MachineAssignmentSeed, OrdersSeed } from '@ap3/database';
import { GetMachineAssignmentAmqpDto } from '../get-machine-assignment-amqp.dto';

export const GetMachineAssignmentAMQPMock = <GetMachineAssignmentAmqpDto[]>[
  {
    orderId: OrdersSeed[0].id,
    machineId: MachineAssignmentSeed[0].machineId,
    start: new Date(MachineAssignmentSeed[0].start),
    end: new Date(MachineAssignmentSeed[0].end),
    ownerId: CompaniesSeed[2].id,
    ownerName: CompaniesSeed[2].name,
  },
  {
    orderId: OrdersSeed[0].id,
    machineId: MachineAssignmentSeed[1].machineId,
    start: new Date(MachineAssignmentSeed[1].start),
    end: new Date(MachineAssignmentSeed[1].end),
    ownerId: CompaniesSeed[2].id,
    ownerName: CompaniesSeed[2].name,
  },
  {
    orderId: OrdersSeed[2].id,
    machineId: MachineAssignmentSeed[2].machineId,
    start: new Date(MachineAssignmentSeed[2].start),
    end: new Date(MachineAssignmentSeed[2].end),
    ownerId: CompaniesSeed[2].id,
    ownerName: CompaniesSeed[2].name,
  },
];
