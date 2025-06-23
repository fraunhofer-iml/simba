/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { registerAs } from '@nestjs/config';

export const CPPS_SCHEDULER_IDENTIFIER = 'cppsScheduler';

export interface CppsSchedulerConfig {
  baseURL: string;
}

export default registerAs(CPPS_SCHEDULER_IDENTIFIER, () => ({
  baseURL: process.env['CPPS_SCHED_BASE_URL'] || 'http://localhost:8080',
}));
