/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ServiceStatesEnum {
  OPEN = 'open',
  PLANNED = 'planned',
  SCHEDULED = 'scheduled',
  PRODUCED = 'produced',
  CANCELED = 'canceled',
}

export const SERVICE_STATES_TO_SHOW: string[] = [ServiceStatesEnum.PLANNED, ServiceStatesEnum.SCHEDULED, ServiceStatesEnum.PRODUCED];
export const ALL_SERVICE_STATES_FOR_DETAILS: string[] = [
  ServiceStatesEnum.OPEN,
  ServiceStatesEnum.PLANNED,
  ServiceStatesEnum.SCHEDULED,
  ServiceStatesEnum.PRODUCED,
];
