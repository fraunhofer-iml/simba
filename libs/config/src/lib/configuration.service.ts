/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CPPS_SCHEDULER_IDENTIFIER, CppsSchedulerConfig } from './configs/cpps-scheduler.config';
import { GENERAL_IDENTIFIER, generalConfig } from './configs/general.config';
import { KEYCLOAK_IDENTIFIER, KeycloakConfig } from './configs/keycloak.config';
import { MINIO_IDENTIFIER, MinioConfig } from './configs/minio.config';

@Injectable()
export class ConfigurationService {
  logger = new Logger(ConfigurationService.name);
  constructor(private readonly configService: ConfigService) {}

  public getGeneralConfig(): generalConfig {
    const generalConfig = this.configService.get<generalConfig>(GENERAL_IDENTIFIER);
    if (!generalConfig) {
      const msg = 'Environment variables for general configuration missing!';
      this.logger.error(msg);
      throw new Error(msg);
    }
    return generalConfig;
  }

  public getKeycloakConfig(): KeycloakConfig {
    const keycloakConfig = this.configService.get<KeycloakConfig>(KEYCLOAK_IDENTIFIER);
    if (!keycloakConfig) {
      const msg = 'Environment variables for keycloak configuration missing!';
      this.logger.error(msg);
      throw new Error(msg);
    }
    return keycloakConfig;
  }

  public getMinioConfig(): MinioConfig {
    const minioConfig = this.configService.get<MinioConfig>(MINIO_IDENTIFIER);
    if (!minioConfig) {
      const msg = 'Environment variables for minio configuration missing!';
      this.logger.error(msg);
      throw new Error(msg);
    }
    return minioConfig;
  }

  public getCppsSchedulerConfig(): CppsSchedulerConfig {
    const cppsSchedulerConfig = this.configService.get<CppsSchedulerConfig>(CPPS_SCHEDULER_IDENTIFIER);
    if (!cppsSchedulerConfig) {
      const msg = 'Environment variables for CPPS scheduler configuration missing!';
      this.logger.error(msg);
      throw new Error(msg);
    }
    return cppsSchedulerConfig;
  }
}
