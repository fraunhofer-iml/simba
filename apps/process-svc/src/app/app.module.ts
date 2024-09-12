import { Module } from '@nestjs/common';

import { ConfigurationModule } from '@ap3/config';
import { OrdersModule } from '../orders/orders.module';
import {OffersModule} from "../offers/offers.module";

@Module({
  imports: [ConfigurationModule, OrdersModule, OffersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
