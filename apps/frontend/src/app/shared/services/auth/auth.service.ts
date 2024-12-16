import { KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';
import { USERROLES } from '../../enums/user-roles';

@Injectable()
export class AuthService {
  private status: boolean;
  private readonly role: string;
  private readonly userRoles: string[];

  constructor(private keyCloakService: KeycloakService) {
    this.status = false;
    this.userRoles = this.keyCloakService.getUserRoles();
    this.role = this.findCurrentlyLoggedInUserRole();
  }

  changeStatus() {
    this.status = !this.status;
  }

  isLoggedIn() {
    return this.status;
  }

  async logout() {
    await this.keyCloakService.logout(window.location.origin);
  }

  getUserName(): string {
    if (this.keyCloakService.isLoggedIn()) {
      return this.keyCloakService.getUsername();
    }
    return '';
  }

  getCurrentlyLoggedInCompanyId(): string {
    const keycloakInstance = this.keyCloakService.getKeycloakInstance();
    return (<string[]>keycloakInstance.profile?.attributes?.['company'])[0];
  }

  findCurrentlyLoggedInUserRole(): string {
    let role = '';
    if (this.isAdmin()) {
      role = USERROLES.ADMIN;
    } else if (this.isContributor()) {
      role = USERROLES.CONTRIBUTOR;
    } else if (this.isCustomer()) {
      role = USERROLES.CUSTOMER;
    }
    return role;
  }

  getCurrentlyLoggedInUserRole() {
    return this.role;
  }

  isAdmin() {
    return this.userRoles.some((role: string) => role === USERROLES.ADMIN);
  }
  isContributor() {
    return this.userRoles.some((role: string) => role === USERROLES.CONTRIBUTOR);
  }
  isCustomer() {
    return this.userRoles.some((role: string) => role === USERROLES.CUSTOMER);
  }
}
