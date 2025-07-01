import { AuthService } from './auth.service';
import { UserRoles } from '@ap3/util';

describe('AuthService', () => {
  let service: AuthService;
  let mockKeycloakService: any;

  beforeEach(() => {
    mockKeycloakService = {
      getUserRoles: jest.fn(),
      logout: jest.fn().mockResolvedValue(undefined),
      isLoggedIn: jest.fn(),
      getUsername: jest.fn(),
      getKeycloakInstance: jest.fn(),
    };
  });

  it('should detect role ADMIN', () => {
    mockKeycloakService.getUserRoles.mockReturnValue([UserRoles.ADMIN]);
    service = new AuthService(mockKeycloakService);

    expect(service.getCurrentlyLoggedInUserRole()).toBe(UserRoles.ADMIN);
    expect(service.isOperator()).toBe(true);
    expect(service.isContributor()).toBe(false);
    expect(service.isCustomer()).toBe(false);
  });

  it('should detect role CONTRIBUTOR', () => {
    mockKeycloakService.getUserRoles.mockReturnValue([UserRoles.CONTRIBUTOR]);
    service = new AuthService(mockKeycloakService);

    expect(service.getCurrentlyLoggedInUserRole()).toBe(UserRoles.CONTRIBUTOR);
    expect(service.isContributor()).toBe(true);
  });

  it('should detect role CUSTOMER', () => {
    mockKeycloakService.getUserRoles.mockReturnValue([UserRoles.CUSTOMER]);
    service = new AuthService(mockKeycloakService);

    expect(service.getCurrentlyLoggedInUserRole()).toBe(UserRoles.CUSTOMER);
    expect(service.isCustomer()).toBe(true);
  });

  it('should toggle login status', () => {
    mockKeycloakService.getUserRoles.mockReturnValue([]);
    service = new AuthService(mockKeycloakService);

    expect(service.isLoggedIn()).toBe(false);
    service.changeStatus();
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should call logout on keycloakService', async () => {
    mockKeycloakService.getUserRoles.mockReturnValue([]);
    service = new AuthService(mockKeycloakService);

    await service.logout();
    expect(mockKeycloakService.logout).toHaveBeenCalledWith(window.location.origin);
  });

  it('should return username if logged in', () => {
    mockKeycloakService.getUserRoles.mockReturnValue([]);
    mockKeycloakService.isLoggedIn.mockReturnValue(true);
    mockKeycloakService.getUsername.mockReturnValue('admin');
    service = new AuthService(mockKeycloakService);

    expect(service.getUserName()).toBe('admin');
  });

  it('should return company ID and compare correctly', () => {
    mockKeycloakService.getUserRoles.mockReturnValue([]);
    mockKeycloakService.getKeycloakInstance.mockReturnValue({
      profile: { attributes: { company: ['SmartPay Solutions AG'] } },
    });
    service = new AuthService(mockKeycloakService);

    expect(service.getCurrentlyLoggedInCompanyId()).toBe('SmartPay Solutions AG');
    expect(service.isCurrentlyLoggedInCompany('SmartPay Solutions AG')).toBe(true);
  });
});
