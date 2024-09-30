import { ConfigurationModule, ConfigurationService } from '@ap3/config';
import { Module } from '@nestjs/common';
import { OffersModule } from '../offers/offers.module';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';
import { TradeReceivablesModule } from '../trade-receivables/trade-receivables.module';

@Module({
  imports: [ConfigurationModule, OffersModule, OrdersModule, ProductsModule, TradeReceivablesModule],
  controllers: [],
  providers: [ConfigurationService],
})
export class AppModule {}
