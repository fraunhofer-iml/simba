/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { FinancialRoles, UserRoles } from '@ap3/util';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class FinancialRoleService {
  private readonly financialRole: FinancialRoles;

  constructor(private readonly authService: AuthService) {
    this.financialRole = this.findFinancialRole();
  }

  findFinancialRole() {
    let res = FinancialRoles.DEBTOR;
    const currentUserRole = this.authService.getCurrentlyLoggedInUserRole();
    if (currentUserRole) {
      if (currentUserRole === UserRoles.CONTRIBUTOR) {
        res = FinancialRoles.CREDITOR;
      }
    }
    return res;
  }

  getFinancialRole() {
    return this.financialRole;
  }
}
