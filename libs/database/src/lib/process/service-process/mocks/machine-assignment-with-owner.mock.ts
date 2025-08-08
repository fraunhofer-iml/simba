/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { companiesSeed, machineAssignmentSeed, serviceProcessesSeed } from '../../../../seed';
import { MachineAssignmentWithOwner } from '../types/machine-assignment-with-owner.types';

export const machineAssignmentWithOwnerMock = <MachineAssignmentWithOwner[]>[
  {
    ...machineAssignmentSeed[0],
    serviceProcess: {
      orderId: serviceProcessesSeed[0].orderId,
    },
    machine: {
      company: {
        id: companiesSeed[2].id,
        name: companiesSeed[2].name,
      },
    },
  },
  {
    ...machineAssignmentSeed[1],
    serviceProcess: {
      orderId: serviceProcessesSeed[0].orderId,
    },
    machine: {
      company: {
        id: companiesSeed[2].id,
        name: companiesSeed[2].name,
      },
    },
  },
  {
    ...machineAssignmentSeed[2],
    serviceProcess: {
      orderId: serviceProcessesSeed[1].orderId,
    },
    machine: {
      company: {
        id: companiesSeed[2].id,
        name: companiesSeed[2].name,
      },
    },
  },
];
