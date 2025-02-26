import { registerAs } from '@nestjs/config';

export const CPPS_SCHEDULER_IDENTIFIER = 'cppsScheduler';

export interface CppsSchedulerConfig {
  baseURL: string;
}

export default registerAs(CPPS_SCHEDULER_IDENTIFIER, () => ({
  baseURL: process.env['CPPS_SCHED_BASE_URL'] || 'http://localhost:8080',
}));
