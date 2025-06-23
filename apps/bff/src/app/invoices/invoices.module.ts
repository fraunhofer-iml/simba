/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrokerAmqp } from '@ap3/amqp';
import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService],
  imports: [new BrokerAmqp().getProcessSvcBroker(), CompaniesModule],
})
export class InvoicesModule {}
