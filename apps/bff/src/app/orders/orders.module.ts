/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrokerAmqp } from '@ap3/amqp';
import { ConfigurationModule } from '@ap3/config';
import { Module } from '@nestjs/common';
import { CompaniesService } from '../companies/companies.service';
import { InvoicesService } from '../invoices/invoices.service';
import { OffersService } from '../offers/offers.service';
import { ProductsService } from '../products/products.service';
import { ServiceProcessService } from '../service-process/service-process.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [new BrokerAmqp().getProcessSvcBroker(), new BrokerAmqp().getMasterDataSvcBroker(), ConfigurationModule],
  controllers: [OrdersController],
  providers: [OrdersService, OffersService, ProductsService, CompaniesService, ServiceProcessService, InvoicesService],
})
export class OrdersModule {}
