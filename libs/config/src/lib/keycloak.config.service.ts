import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

import { ConfigurationService } from './configuration.service';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  constructor(private config: ConfigurationService) {}

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: this.config.getKeycloakConfig().url, // might be http://localhost:8080/auth for older keycloak versions
      realm: this.config.getKeycloakConfig().realm,
      clientId: this.config.getKeycloakConfig().clientId,
      secret: this.config.getKeycloakConfig().secret,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
