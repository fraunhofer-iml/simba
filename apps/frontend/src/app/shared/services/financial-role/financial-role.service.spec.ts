import { KeycloakService } from 'keycloak-angular';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';
import { FinancialRoleService } from './financial-role.service';

describe('FinancialRoleService', () => {
  let service: FinancialRoleService;

  beforeEach(() => {
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
});
