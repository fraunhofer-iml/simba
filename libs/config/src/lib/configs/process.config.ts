import { registerAs } from '@nestjs/config';

export const PROCESS_SVC_IDENTIFIER = 'process-svc';

export interface processSvcConfig {
  port: number;
}

export default registerAs(PROCESS_SVC_IDENTIFIER, () => ({
  port: process.env['PROCESS_SVC_PORT'] || 3001,
}));
