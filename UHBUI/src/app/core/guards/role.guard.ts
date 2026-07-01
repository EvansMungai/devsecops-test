import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[];
  const user = auth.getUser();

  if (!user) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false;
  }

  if (auth.hasAnyRole(allowedRoles)) {
    return true
  }
  
  router.navigate(['/access-denied']);
  return false;
};
