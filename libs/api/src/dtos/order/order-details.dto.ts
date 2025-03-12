/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiProperty } from '@nestjs/swagger';
import { GetMachineAssignmentDto, ServiceProcessStatusDto } from '../service-process';
import { OrderOverviewDto } from './order-overview.dto';

export class OrderDetailsDto {
  @ApiProperty()
  order: OrderOverviewDto;
  @ApiProperty({
    type: [ServiceProcessStatusDto],
  })
  processStateHistory: ServiceProcessStatusDto[];
  @ApiProperty({
    type: [GetMachineAssignmentDto],
  })
  machineAssignments: GetMachineAssignmentDto[];

  constructor(order: OrderOverviewDto, processStateHistory: ServiceProcessStatusDto[], machineAssignments: GetMachineAssignmentDto[]) {
    this.order = order;
    this.processStateHistory = processStateHistory;
    this.machineAssignments = machineAssignments;
  }
}
