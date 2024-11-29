import { ConfigurationModule } from '@ap3/config';
import { Module } from '@nestjs/common';
import { OffersModule } from './offers/offers.module';
import { OrdersModule } from './orders/orders.module';
import { TradeReceivablesModule } from './trade-receivables/trade-receivables.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [ConfigurationModule, OrdersModule, OffersModule, TradeReceivablesModule, InvoicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
