/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserRoles } from '@ap3/util';
import { KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private status: boolean;
  private readonly role: string;
  private readonly userRoles: string[];

  constructor(private readonly keyCloakService: KeycloakService) {
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
    if (this.isOperator()) {
      role = UserRoles.ADMIN;
    } else if (this.isContributor()) {
      role = UserRoles.CONTRIBUTOR;
    } else if (this.isCustomer()) {
      role = UserRoles.CUSTOMER;
    }
    return role;
  }

  getCurrentlyLoggedInUserRole() {
    return this.role;
  }

  isOperator() {
    return this.userRoles.some((role: string) => role === UserRoles.ADMIN);
  }
  isContributor() {
    return this.userRoles.some((role: string) => role === UserRoles.CONTRIBUTOR);
  }
  isCustomer() {
    return this.userRoles.some((role: string) => role === UserRoles.CUSTOMER);
  }

  isCurrentlyLoggedInCompany(companyId: string) {
    return this.getCurrentlyLoggedInCompanyId() === companyId;
  }
}
