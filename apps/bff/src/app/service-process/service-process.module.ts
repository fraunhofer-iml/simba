/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrokerAmqp } from '@ap3/amqp';
import { Module } from '@nestjs/common';
import { ServiceProcessController } from './service-process.controller';
import { ServiceProcessService } from './service-process.service';

@Module({
  imports: [new BrokerAmqp().getProcessSvcBroker()],
  controllers: [ServiceProcessController],
  providers: [ServiceProcessService],
})
export class ServiceProcessModule {}
