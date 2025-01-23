import { ConfigurationModule } from '@ap3/config';
import { Module } from '@nestjs/common';
import { OffersModule } from './offers/offers.module';
import { OrdersModule } from './orders/orders.module';
import { TradeReceivablesModule } from './trade-receivables/trade-receivables.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ServiceProcessModule } from './service-process/service-process.module';

@Module({
  imports: [ConfigurationModule, OrdersModule, OffersModule, TradeReceivablesModule, InvoicesModule, ServiceProcessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
