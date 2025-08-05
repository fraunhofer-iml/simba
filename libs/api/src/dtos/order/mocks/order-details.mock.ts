/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { offerDtosMock } from '../../offer';
import { GetMachineAssignmentsDtoMock } from '../../service-process';
import { ProcessStateHistoryMock } from '../../service-process/mocks/process-state-history.mock';
import { OrderDetailsDto } from '../order-details.dto';
import { OrderOverviewMock } from './order-overview.mock';

export const OrderDetailsMock = <OrderDetailsDto[]>[
  {
    order: OrderOverviewMock[0],
    processStateHistory: [ProcessStateHistoryMock[0], ProcessStateHistoryMock[1]],
    machineAssignments: [GetMachineAssignmentsDtoMock[0], GetMachineAssignmentsDtoMock[1]],
  },
  {
    order: OrderOverviewMock[1],
    processStateHistory: [ProcessStateHistoryMock[2]],
    machineAssignments: [GetMachineAssignmentsDtoMock[2]],
    offer: offerDtosMock[1],
  },
];
