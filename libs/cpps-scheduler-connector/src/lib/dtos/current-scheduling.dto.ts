/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScheduledMachineAssignmentDto } from './scheduled-machine-assignment.dto';

export class CurrentSchedulingDto {
  orderId: string;
  price: number;
  machineAssignment: ScheduledMachineAssignmentDto[];

  constructor(orderId: string, price: number, machineAssignment: ScheduledMachineAssignmentDto[]) {
    this.orderId = orderId;
    this.price = price;
    this.machineAssignment = machineAssignment;
  }
}
