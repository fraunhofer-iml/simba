import { Module } from '@nestjs/common';
import { ConfigurationModule, ConfigurationService } from '@ap3/config';
import { OffersModule } from '../offers/offers.module';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ConfigurationModule, OffersModule, OrdersModule, ProductsModule],
  controllers: [],
  providers: [ConfigurationService],
})
export class AppModule {}
