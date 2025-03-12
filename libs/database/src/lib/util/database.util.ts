/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceProcessWithMachineAssignmentsTypes } from '../process/service-process/types/service-process-with-machine-assignments.types';

export class DatabaseUtil {
  static ExtractMachineIdsFromServiceProcess(serviceProcess: ServiceProcessWithMachineAssignmentsTypes | null): string[] {
    const machines: string[] = [];
    if (serviceProcess?.machineAssignments) {
      for (const assignment of serviceProcess.machineAssignments) {
        machines.push(assignment.machine.id);
      }
    }
    return machines;
  }
}
