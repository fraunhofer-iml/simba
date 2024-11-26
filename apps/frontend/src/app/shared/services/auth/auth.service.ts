import { KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';
import { HARDCODEDVALUES } from '../../enums/hard-coded-values';

@Injectable()
export class AuthService {
  private status: boolean;

  constructor(private keyCloakService: KeycloakService) {
    this.status = false;
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
  getCurrentlyLoggedInCompanyId() {
    return HARDCODEDVALUES.COMPANYID;
  }
}
