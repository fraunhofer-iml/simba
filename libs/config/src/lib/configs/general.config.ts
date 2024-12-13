import { LogLevel } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export const GENERAL_IDENTIFIER = 'general';

export interface generalConfig {
  logLevel: LogLevel[];
  swaggerPath: string;
  brokerURI: string;
  platformOperator: string;
  platformCurrency: string;
}

export default registerAs(GENERAL_IDENTIFIER, () => ({
  logLevel: (process.env['LOG_SETTINGS'] || 'error,verbose').split(','),
  swaggerPath: process.env['SWAGGER_PATH'] || 'api',
  brokerURI: process.env['BROKER_URI'] || 'amqp://localhost:5672',
  platformOperator: process.env['PLATFORM_OPERATOR'] || 'pt0002',
  platformCurrency: process.env['PLATFORM_CURRENCY'] || 'Euro',
}));
