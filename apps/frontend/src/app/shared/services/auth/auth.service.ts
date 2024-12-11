import { KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';

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

  getCurrentlyLoggedInCompanyId(): string {
    const keycloakInstance = this.keyCloakService.getKeycloakInstance();
    return <string>keycloakInstance.profile?.attributes?.['company'];
  }
}
