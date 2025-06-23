/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrokerAmqp } from '@ap3/amqp';
import { Module } from '@nestjs/common';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesService } from './trade-receivables.service';
import { BlockchainConnectorModule } from '@ap3/blockchain-connector';

@Module({
  controllers: [TradeReceivablesController],
  providers: [TradeReceivablesService],
  imports: [new BrokerAmqp().getProcessSvcBroker(), new BrokerAmqp().getMasterDataSvcBroker(), BlockchainConnectorModule],
})
export class TradeReceivablesModule {}
