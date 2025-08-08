/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { offerDtosMock } from '../../offer';
import { getMachineAssignmentsDtoMock } from '../../service-process';
import { processStateHistoryMock } from '../../service-process/mocks/process-state-history.mock';
import { OrderDetailsDto } from '../order-details.dto';
import { orderOverviewMock } from './order-overview.mock';

export const orderDetailsMock = <OrderDetailsDto[]>[
  {
    order: orderOverviewMock[0],
    processStateHistory: [processStateHistoryMock[0], processStateHistoryMock[1]],
    machineAssignments: [getMachineAssignmentsDtoMock[0], getMachineAssignmentsDtoMock[1]],
  },
  {
    order: orderOverviewMock[1],
    processStateHistory: [processStateHistoryMock[2]],
    machineAssignments: [getMachineAssignmentsDtoMock[2]],
    offer: offerDtosMock[1],
  },
];
