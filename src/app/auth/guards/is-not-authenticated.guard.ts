import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

const authService = inject( AuthService );

  if (authService.authStatus() === AuthStatus.notAuthenticated) return true;

  return false;
};
