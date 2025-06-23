/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Prisma } from '@prisma/client';

export const GetMachineAssignmentsQueryMock = <Prisma.MachineAssignmentFindManyArgs>{
  where: { serviceProcess: { orderId: String('o001') } },
  include: {
    serviceProcess: { select: { orderId: true } },
    machine: {
      select: {
        company: { select: { id: true, name: true } },
      },
    },
  },
};
