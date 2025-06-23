/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompaniesSeed, MachineAssignmentSeed, ServiceProcessesSeed } from '../../../../seed';
import { MachineAssignmentWithOwner } from '../types/machine-assignment-with-owner.types';

export const MachineAssignmentWithOwnerMock = <MachineAssignmentWithOwner[]>[
  {
    ...MachineAssignmentSeed[0],
    serviceProcess: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
    machine: {
      company: {
        id: CompaniesSeed[2].id,
        name: CompaniesSeed[2].name,
      },
    },
  },
  {
    ...MachineAssignmentSeed[1],
    serviceProcess: {
      orderId: ServiceProcessesSeed[0].orderId,
    },
    machine: {
      company: {
        id: CompaniesSeed[2].id,
        name: CompaniesSeed[2].name,
      },
    },
  },
  {
    ...MachineAssignmentSeed[2],
    serviceProcess: {
      orderId: ServiceProcessesSeed[1].orderId,
    },
    machine: {
      company: {
        id: CompaniesSeed[2].id,
        name: CompaniesSeed[2].name,
      },
    },
  },
];
