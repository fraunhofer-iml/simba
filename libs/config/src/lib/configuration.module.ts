/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import cppsSchedulerConfig from './configs/cpps-scheduler.config';
import generalConfig from './configs/general.config';
import keycloakConfig from './configs/keycloak.config';
import minioConfig from './configs/minio.config';
import { ConfigurationService } from './configuration.service';
import { KeycloakConfigService } from './keycloak.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../../.env', '../../.env.local'],
      isGlobal: true,
      cache: true,
      load: [keycloakConfig, generalConfig, minioConfig, cppsSchedulerConfig],
    }),
    KeycloakConnectModule,
  ],
  controllers: [],
  providers: [ConfigurationService, KeycloakConfigService],
  exports: [ConfigurationService, KeycloakConfigService],
})
export class ConfigurationModule {}
