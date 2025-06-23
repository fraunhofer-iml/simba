/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.KEYCLOAK_URL,
        realm: environment.KEYCLOAK_REALM,
        clientId: environment.KEYCLOAK_CLIENT_ID,
      },
      loadUserProfileAtStartUp: true,
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoFallback: false,
        checkLoginIframe: false,
        flow: 'standard',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/keycloak/silent-check-sso.html',
      },
    });
}
