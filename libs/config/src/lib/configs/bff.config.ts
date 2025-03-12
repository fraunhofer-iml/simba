/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { registerAs } from '@nestjs/config';

export const BFF_IDENTIFIER = 'bff';

export interface bffConfig {
  port: number;
}

export default registerAs(BFF_IDENTIFIER, () => ({
  port: process.env['BFF_PORT'] || 3000,
}));
