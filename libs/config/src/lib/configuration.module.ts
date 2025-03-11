import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import bffConfig from './configs/bff.config';
import cppsSchedulerConfig from './configs/cpps-scheduler.config';
import generalConfig from './configs/general.config';
import keycloakConfig from './configs/keycloak.config';
import minioConfig from './configs/minio.config';
import nftScheduleConfig from './configs/nftUpdateScheduleConfig';
import { ConfigurationService } from './configuration.service';
import { KeycloakConfigService } from './keycloak.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../../.env'],
      isGlobal: true,
      cache: true,
      load: [keycloakConfig, bffConfig, generalConfig, minioConfig, nftScheduleConfig, cppsSchedulerConfig],
    }),
    KeycloakConnectModule,
  ],
  controllers: [],
  providers: [ConfigurationService, KeycloakConfigService],
  exports: [ConfigurationService, KeycloakConfigService],
})
export class ConfigurationModule {}
