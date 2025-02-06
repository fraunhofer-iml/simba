import { FinancialRoles, UserRoles } from '@ap3/util';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class FinancialRoleService {
  private financialRole: FinancialRoles;
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

  setFinancialRole(newRole: FinancialRoles) {
    this.financialRole = newRole;
  }

  getFinancialRole() {
    return this.financialRole;
  }
}
