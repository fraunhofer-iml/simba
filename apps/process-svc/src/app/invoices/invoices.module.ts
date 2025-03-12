/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationModule } from '@ap3/config';
import { DatabaseModule } from '@ap3/database';
import { S3Module } from '@ap3/s3';
import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { InvoicesStatisticsService } from './statistics/invoices-statistics.service';
import { InvoicesZugferdService } from './zugferd/invoices-zugferd.service';

@Module({
  imports: [DatabaseModule, S3Module, ConfigurationModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicesZugferdService, InvoicesStatisticsService],
})
export class InvoicesModule {}
