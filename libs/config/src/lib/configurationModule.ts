import { Module } from '@nestjs/common';
import keycloakConfig from './configs/keycloak.config';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';
import { KeycloakConfigService } from './keycloak.config.service';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import bffConfig from './configs/bff.config';

@Module({
  imports:[
    ConfigModule.forRoot({
    envFilePath: ['../../.env'],
    isGlobal: true,
    cache: true,
    load: [keycloakConfig, bffConfig],
  }),
    KeycloakConnectModule,
  ],
  controllers: [],
  providers: [ConfigurationService, KeycloakConfigService],
  exports: [ConfigurationService, KeycloakConfigService],
})
export class ConfigurationModule {}
