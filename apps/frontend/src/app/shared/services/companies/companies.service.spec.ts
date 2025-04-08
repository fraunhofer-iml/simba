import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';
import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KeycloakAngularModule],
      providers: [
        CompaniesService,
        provideHttpClient(),
        provideHttpClientTesting(),
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
    service = TestBed.inject(CompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
