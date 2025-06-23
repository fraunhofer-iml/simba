/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationModule } from '@ap3/config';
import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigurationModule, ProductsModule, CompaniesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
