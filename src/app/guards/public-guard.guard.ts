import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const { isLoggedIn } = inject(AuthService);
  const router = inject(Router);

  if (isLoggedIn()) {
    router.navigate(['/perfil']);
    return false;
  } else {
    return true;
  }
};