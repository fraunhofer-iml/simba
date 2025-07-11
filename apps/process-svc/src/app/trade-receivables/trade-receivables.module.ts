/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlockchainConnectorModule } from '@ap3/blockchain-connector';
import { ConfigurationModule } from '@ap3/config';
import { DatabaseModule } from '@ap3/database';
import { S3Module } from '@ap3/s3';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { InvoicesStatisticsService } from '../invoices/statistics/invoices-statistics.service';
import { MetadataService } from './metadata/metadata.service';
import { TradeReceivablesController } from './trade-receivables.controller';
import { TradeReceivablesCronJob } from './trade-receivables.cron-job';
import { TradeReceivablesService } from './trade-receivables.service';
import { NftDatabaseService } from './nft/nft-database.service';
import { NftBlockchainService } from './nft/nft-blockchain.service';

@Module({
  imports: [DatabaseModule, S3Module, ConfigurationModule, BlockchainConnectorModule, ScheduleModule.forRoot()],
  controllers: [TradeReceivablesController],
  providers: [
    TradeReceivablesService,
    InvoicesStatisticsService,
    MetadataService,
    TradeReceivablesCronJob,
    NftDatabaseService,
    NftBlockchainService,
    {
      provide: 'NftService',
      useClass: process.env['BCC_ENABLED'] == 'true' ? NftBlockchainService : NftDatabaseService
    }
  ],

})
export class TradeReceivablesModule {}
