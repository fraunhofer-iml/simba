/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { BrokerAmqp } from '@ap3/amqp';

@Module({
  controllers: [OffersController],
  imports: [new BrokerAmqp().getProcessSvcBroker()],
  providers: [OffersService],
})
export class OffersModule {}
