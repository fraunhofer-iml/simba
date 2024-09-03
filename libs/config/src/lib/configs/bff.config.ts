import { registerAs } from '@nestjs/config';

export const BFF_IDENTIFIER = 'bff';

export interface bffConfig {
  port: number;
}

export default registerAs(BFF_IDENTIFIER, () => ({
  port: process.env['BFF_PORT'] || 3000,
}));
