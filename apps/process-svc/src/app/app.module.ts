/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationModule } from '@ap3/config';
import { Module } from '@nestjs/common';
import { InvoicesModule } from './invoices/invoices.module';
import { OffersModule } from './offers/offers.module';
import { OrdersModule } from './orders/orders.module';
import { ServiceProcessModule } from './service-process/service-process.module';
import { TradeReceivablesModule } from './trade-receivables/trade-receivables.module';

@Module({
  imports: [ConfigurationModule, OrdersModule, OffersModule, TradeReceivablesModule, InvoicesModule, ServiceProcessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
