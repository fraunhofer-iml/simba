import { ConfigurationModule, ConfigurationService, KeycloakConfigService } from '@ap3/config';
import { AuthGuard, KeycloakConnectModule, RoleGuard } from 'nest-keycloak-connect';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CompaniesModule } from './companies/companies.module';
import { InvoicesModule } from './invoices/invoices.module';
import { OffersModule } from './offers/offers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { TradeReceivablesModule } from './trade-receivables/trade-receivables.module';
import { ServiceProcessModule } from './service-process/service-process.module';

@Module({
  imports: [
    ConfigurationModule,
    OffersModule,
    OrdersModule,
    ProductsModule,
    TradeReceivablesModule,
    CompaniesModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigurationModule],
    }),
    InvoicesModule,
    ServiceProcessModule,
  ],
  controllers: [],
  providers: [
    ConfigurationService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }
  ],
})
export class AppModule {}
