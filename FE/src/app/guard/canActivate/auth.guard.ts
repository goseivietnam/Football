import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (
    inject(AuthService).isAuthenticated()
    // &&
    // inject(AuthService).hasPermission('admin')
  ) {
    return true;
  }
  return router.parseUrl('/login-admin');
};
