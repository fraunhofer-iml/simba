import { Injectable, Logger, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { KEYCLOAK_IDENTIFIER, KeycloakConfig } from './configs/keycloak.config';
import { BFF_IDENTIFIER, bffConfig } from './configs/bff.config';

@Injectable()
export class ConfigurationService {
  logger = new Logger(ConfigurationService.name);
  constructor(private readonly configService: ConfigService) {}

  public getLogLevel(): LogLevel[] {
    const logLevel = this.configService.get<string>('LOG_SETTINGS', 'error,verbose').split(',');
    return <LogLevel[]>logLevel;
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
