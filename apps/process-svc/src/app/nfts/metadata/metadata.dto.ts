/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { MachineAssignment, ServiceProcess, ServiceStatus } from '@prisma/client';

export class MetadataDto {
  serviceProcess: ServiceProcess;
  offerIds: string[];
  machineAssignments: MachineAssignment[];
  invoiceIds: string[];
  states: ServiceStatus[];


  constructor(serviceProcess: ServiceProcess, offerIds: string[], machineAssignments: MachineAssignment[], invoiceIds: string[], states: ServiceStatus[]) {
    this.serviceProcess = serviceProcess;
    this.offerIds = offerIds;
    this.machineAssignments = machineAssignments;
    this.invoiceIds = invoiceIds;
    this.states = states;
  }
}
