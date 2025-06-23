/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { registerAs } from '@nestjs/config';

export const KEYCLOAK_IDENTIFIER = 'keycloak';

export interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
  secret: string;
  grantType: string;
  username: string;
  password: string;
}

export default registerAs(KEYCLOAK_IDENTIFIER, () => ({
  url: process.env['KEYCLOAK_URL'] || 'https://kc.public.apps.blockchain-europe.iml.fraunhofer.de',
  realm: process.env['KEYCLOAK_REALM'] || 'AP3',
  clientId: process.env['KEYCLOAK_CLIENT_ID'] || '',
  secret: process.env['KEYCLOAK_SECRET'] || '',
  username: process.env['KEYCLOAK_USER'] || '',
  password: process.env['KEYCLOAK_PASSWORD'] || '',
  grantType: process.env['KEYCLOAK_GRANT_TYPE'] || 'client_credentials',
}));
