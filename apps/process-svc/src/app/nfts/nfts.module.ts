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
import { InvoicesService } from '../invoices/invoices.service';
import { PaymentManagementService } from '../invoices/payment-management/payment-management.service';
import { InvoicesStatisticsService } from '../invoices/statistics/invoices-statistics.service';
import { InvoicesZugferdService } from '../invoices/zugferd/invoices-zugferd.service';
import { MetadataService } from './metadata/metadata.service';
import { NftsController } from './nfts.controller';
import { NftsCronJob } from './nfts.cron-job';
import { NftsService } from './nfts.service';
import { NftBlockchainFactory } from './util/nft-blockchain-factory';
import { NftDatabaseFactory } from './util/nft-database-factory';

@Module({
  imports: [DatabaseModule, S3Module, ConfigurationModule, BlockchainConnectorModule, ScheduleModule.forRoot()],
  controllers: [NftsController],
  providers: [
    NftsService,
    InvoicesStatisticsService,
    MetadataService,
    NftsCronJob,
    InvoicesService,
    InvoicesZugferdService,
    NftDatabaseFactory,
    PaymentManagementService,
    NftBlockchainFactory,
    {
      provide: 'NftFactory',
      useClass: process.env['BCC_ENABLED'] == 'true' ? NftBlockchainFactory : NftDatabaseFactory,
    },
  ],
})
export class NftsModule {}
