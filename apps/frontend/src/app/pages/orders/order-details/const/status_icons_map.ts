/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceStatesEnum } from '@ap3/util';

export const STATUS_ICONS_MAP: Record<ServiceStatesEnum, string> = {
  [ServiceStatesEnum.OPEN]: 'folder_open',
  [ServiceStatesEnum.PLANNED]: 'assignment',
  [ServiceStatesEnum.SCHEDULED]: 'schedule',
  [ServiceStatesEnum.PRODUCED]: 'settings',
  [ServiceStatesEnum.CANCELED]: 'cancel',
};
