import { Module } from '@nestjs/common';

import { ConfigurationModule } from '@ap3/config';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [ConfigurationModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
