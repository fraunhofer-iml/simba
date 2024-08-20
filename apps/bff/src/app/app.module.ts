import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@ap3/config';
import { OffersModule } from '../offers/offers.module';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ConfigurationModule, OffersModule, OrdersModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
