/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class ScheduledMachineAssignmentDto {
  machineId: string;
  start: string;
  end: string;

  constructor(machineId: string, start: string, end: string) {
    this.machineId = machineId;
    this.start = start;
    this.end = end;
  }
}
