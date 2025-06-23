/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { MachineAssignment } from '@prisma/client';

export type MachineAssignmentWithOwner = MachineAssignment & {
  serviceProcess: {
    orderId: string | null;
  };
  machine: {
    company: { id: string; name: string };
  };
};
