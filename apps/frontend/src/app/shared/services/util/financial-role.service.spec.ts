/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeycloakService } from 'keycloak-angular';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';
import { FinancialRoleService } from './financial-role.service';
import { FinancialRoles, UserRoles } from '@ap3/util';

describe('FinancialRoleService', () => {
  let service: FinancialRoleService;
  let authServiceMock: any;

  beforeEach(() => {
    authServiceMock = {
      getCurrentlyLoggedInUserRole: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        FinancialRoleService,
        AuthService,
        {
          provide: KeycloakService,
          useValue: {
            getKeycloakInstance: jest.fn().mockReturnValue({
              profile: {
                attributes: {
                  company: ['pt0001'],
                },
              },
            }),
            getUserRoles: jest.fn().mockReturnValue([]),
          },
        },
      ],
    });
    service = TestBed.inject(FinancialRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return DEBTOR if no user role is set', () => {
    authServiceMock.getCurrentlyLoggedInUserRole.mockReturnValue(undefined);
    const service = new FinancialRoleService(authServiceMock);
    expect(service['financialRole']).toBe(FinancialRoles.DEBTOR);
  });

  it('findFinancialRole should return correct role based on user role', () => {
    authServiceMock.getCurrentlyLoggedInUserRole.mockReturnValue(UserRoles.CONTRIBUTOR);
    const service = new FinancialRoleService(authServiceMock);
    const role = service.findFinancialRole();
    expect(role).toBe(FinancialRoles.CREDITOR);
  });
});
