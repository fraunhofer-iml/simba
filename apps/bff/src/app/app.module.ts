import { ConfigurationModule, ConfigurationService, KeycloakConfigService } from '@ap3/config';
import { AuthGuard, KeycloakConnectModule } from 'nest-keycloak-connect';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { OffersModule } from '../offers/offers.module';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';
import { TradeReceivablesModule } from '../trade-receivables/trade-receivables.module';

@Module({
  imports: [
    ConfigurationModule,
    OffersModule,
    OrdersModule,
    ProductsModule,
    TradeReceivablesModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigurationModule],
    }),
  ],
  controllers: [],
  providers: [
    ConfigurationService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
