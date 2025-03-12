/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { MachineAssignmentWithOwner } from '@ap3/database';
import { MachineAssignmentAmqpDto } from './machine-assignment-amqp.dto';

export class GetMachineAssignmentAmqpDto extends MachineAssignmentAmqpDto {
  ownerId: string;
  ownerName: string;

  constructor(orderId: string, machineId: string, start: Date, end: Date, ownerId: string, ownerName: string) {
    super(orderId, machineId, start, end);
    this.ownerId = ownerId;
    this.ownerName = ownerName;
  }

  public static fromPrismaEntity(machineAssignment: MachineAssignmentWithOwner) {
    return new GetMachineAssignmentAmqpDto(
      machineAssignment.serviceProcess.orderId ? machineAssignment.serviceProcess.orderId : '',
      machineAssignment.machineId,
      machineAssignment.start,
      machineAssignment.end,
      machineAssignment.machine.company.id,
      machineAssignment.machine.company.name
    );
  }
}
