/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CppsSchedulerConnectorModule } from '@ap3/cpps-scheduler-connector';
import { DatabaseModule } from '@ap3/database';
import { Module } from '@nestjs/common';
import { ServiceProcessModule } from '../../service-process/service-process.module';
import { OrderManagementService } from './order-management.service';
import { OrderSchedulingHandlerService } from './order-scheduling-handler.service';

@Module({
  imports: [DatabaseModule, CppsSchedulerConnectorModule, ServiceProcessModule],
  providers: [OrderManagementService, OrderSchedulingHandlerService],
  exports: [OrderManagementService],
})
export class OrderManagementModule {}
