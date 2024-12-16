import { KeycloakService } from 'keycloak-angular';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const keycloakService: KeycloakService = inject(KeycloakService);
  if (keycloakService.isLoggedIn()) {
    return true;
  } else {
    keycloakService.login();
    return false;
  }
};
