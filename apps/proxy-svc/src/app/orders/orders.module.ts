/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { BrokerAmqp } from '@ap3/amqp';
import { BlockchainConnectorModule } from '@ap3/blockchain-connector';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [new BrokerAmqp().getProcessSvcBroker(), BlockchainConnectorModule],
})
export class OrdersModule {}
