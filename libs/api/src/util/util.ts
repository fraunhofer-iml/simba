/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserRoles } from '@ap3/util';
import { KeycloakUser } from '../auth';

export class APIUtil {
  public static isAdminOrLoggedInCompany(user: KeycloakUser, companyId: string): boolean {
    return this.isAdmin(user) || companyId === user.company;
  }

  public static isAdmin(user: KeycloakUser): boolean {
    if (!user || !user.realm_access || !user.realm_access.roles) return false;
    return user.realm_access.roles.includes(UserRoles.ADMIN);
  }
}
