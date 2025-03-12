/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Machine, Prisma } from '@prisma/client';

export const MachinesSeed = <Machine[]>[
  {
    id: 'rt001',
    cppsId: 'cpps1',
    description: 'test robot 1',
    minimalPrice: new Prisma.Decimal(1.3),
    companyId: 'pt0003',
  },
  {
    id: 'rt002',
    cppsId: 'cpps2',
    description: 'test robot 2',
    minimalPrice: new Prisma.Decimal(1.15),
    companyId: 'pt0003',
  },
  {
    id: 'rt003',
    cppsId: 'cpps3',
    description: 'test robot 3',
    minimalPrice: new Prisma.Decimal(1.45),
    companyId: 'pt0003',
  },
];
