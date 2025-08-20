/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrokerAmqp } from '@ap3/amqp';
import { BlockchainConnectorModule } from '@ap3/blockchain-connector';
import { Module } from '@nestjs/common';
import { NftsController } from './nfts.controller';
import { NftsService } from './nfts.service';

@Module({
  controllers: [NftsController],
  providers: [NftsService],
  imports: [new BrokerAmqp().getProcessSvcBroker(), new BrokerAmqp().getMasterDataSvcBroker(), BlockchainConnectorModule],
})
export class NftsModule {}
