/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Module } from '@nestjs/common';
import { InvoiceDatabaseAdapterService, InvoicePrismaService, NftPrismaService } from './finance';
import { CompanyPrismaService, ProductPrismaService } from './master-data';
import { PrismaService } from './prisma.service';
import { OfferPrismaService, OrderDatabaseAdapterService, OrderPrismaService, ServiceProcessPrismaService } from './process';
import { QueryBuilderHelperService } from './util/query-builder-helper.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    OrderPrismaService,
    OfferPrismaService,
    ProductPrismaService,
    CompanyPrismaService,
    InvoicePrismaService,
    ServiceProcessPrismaService,
    QueryBuilderHelperService,
    InvoiceDatabaseAdapterService,
    OrderDatabaseAdapterService,
    NftPrismaService,
  ],
  exports: [
    OfferPrismaService,
    ProductPrismaService,
    CompanyPrismaService,
    InvoicePrismaService,
    ServiceProcessPrismaService,
    InvoiceDatabaseAdapterService,
    OrderDatabaseAdapterService,
    NftPrismaService,
  ],
})
export class DatabaseModule {}
