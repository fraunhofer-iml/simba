import { Injectable, Logger, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { KEYCLOAK_IDENTIFIER, KeycloakConfig } from './configs/keycloak.config';
import { BFF_IDENTIFIER, bffConfig } from './configs/bff.config';
import { GENERAL_IDENTIFIER, generalConfig } from './configs/general.config';

@Injectable()
export class ConfigurationService {
  logger = new Logger(ConfigurationService.name);
  constructor(private readonly configService: ConfigService) {}

  public getGeneralConfig(): generalConfig{
    const generalConfig = this.configService.get<generalConfig>(GENERAL_IDENTIFIER);
    if (!generalConfig) {
      const msg = 'Environment variables for AMQP / RabbitMQ configuration missing!';
      this.logger.error(msg);
      throw new Error(msg);
    }
    return generalConfig;
  }

  public getBFFConfig(): bffConfig{
    const bffConfig = this.configService.get<bffConfig>(BFF_IDENTIFIER);
    if (!bffConfig) {
      const msg = 'Environment variables for bff configuration missing!';
      this.logger.error(msg);
      throw new Error(msg);
    }
    return bffConfig;
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
}
