import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

function parseJwt(token: string): any {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const payload = token ? parseJwt(token) : null;
  if (payload?.role === 'admin') return true;
  router.navigate(['/admin/login']);
  return false;
};


