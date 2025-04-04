/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ServiceStatesEnum {
  OPEN = 'Open',
  PLANNED = 'Planned',
  SCHEDULED = 'Scheduled',
  PRODUCED = 'Produced',
  CANCELED = 'Canceled',
}

export const SERVICE_STATES_TO_SHOW: string[] = [ServiceStatesEnum.PLANNED, ServiceStatesEnum.SCHEDULED, ServiceStatesEnum.PRODUCED];
