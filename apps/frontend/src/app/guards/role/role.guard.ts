import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);

  const currentRole = authService.getCurrentlyLoggedInUserRole();
  if (!currentRole) return false;

  console.log(route);
  console.log(state);

  return route.data['roles'].includes(currentRole);
};
