/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { LogLevel } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { CronExpression } from '@nestjs/schedule';

export const GENERAL_IDENTIFIER = 'general';

export interface generalConfig {
  logLevel: LogLevel[];
  swaggerPath: string;
  brokerURI: string;
  queuePrefix: string;
  platformOperator: string;
  platformCurrency: string;
  bffPort: number;
  proxyPort: number;
  scheduledNFTUpdate: {
    enabled: boolean;
    interval: string;
  };
  scheduledNftUpdateEnabled: boolean;
  scheduledNftUpdateCronJobExpression: string;
  bccEnabled: boolean;
}

export default registerAs(GENERAL_IDENTIFIER, () => ({
  logLevel: (process.env['LOG_SETTINGS'] || 'error,verbose').split(','),
  swaggerPath: process.env['SWAGGER_PATH'] || 'api',
  brokerURI: process.env['BROKER_URI'] || 'amqp://localhost:5672',
  queuePrefix: process.env['AMQP_QUEUE_PREFIX'] || 'SIMBA',
  platformOperator: process.env['PLATFORM_OPERATOR'] || 'pt0002',
  platformCurrency: process.env['PLATFORM_CURRENCY'] || 'Euro',
  bffPort: process.env['BFF_PORT'] || 3000,
  proxyPort: process.env['PROXY_PORT'] || 3001,
  scheduledNFTUpdate: {
    enabled: process.env['SCHEDULED_NFT_UPDATE_ENABLED'] == 'true' || false,
    interval: process.env['SCHEDULED_NFT_UPDATE_CRON_JOB_EXPRESSION'] || CronExpression.EVERY_HOUR,
  },
  bccEnabled: process.env['BCC_ENABLED'] == 'true' || false,
}));
