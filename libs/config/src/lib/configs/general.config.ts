import { registerAs } from '@nestjs/config';
import { LogLevel } from '@nestjs/common';

export const GENERAL_IDENTIFIER = 'general';

export interface generalConfig {
  logLevel: LogLevel[];
  swaggerPath: string;
  brokerURI: string,
}

export default registerAs(GENERAL_IDENTIFIER, () => ({
  logLevel: (process.env['LOG_SETTINGS'] || 'error,verbose').split(','),
  swaggerPath: process.env['SWAGGER_PATH'] || 'api',
  brokerURI: process.env['BROKER_URI'] || "amqp://localhost:5672"
}));
