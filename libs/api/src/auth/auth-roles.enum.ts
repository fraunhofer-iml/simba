/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserRoles } from '@ap3/util';

export enum AuthRolesEnum {
  ADMIN = `realm:${UserRoles.ADMIN}`,
  CUSTOMER = `realm:${UserRoles.CUSTOMER}`,
  CONTRIBUTOR = `realm:${UserRoles.CONTRIBUTOR}`,
}
