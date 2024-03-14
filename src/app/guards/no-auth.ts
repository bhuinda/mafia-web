import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth';
import { NavService } from '@app/shared/services/nav';
import { tap } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const nav = inject(NavService);
  const router = inject(Router);

  return authService.status$.pipe(
    tap(isValid => {
      if (isValid) {
        nav.history.push({ route: state.url, success: false });
        router.navigate(['/auth']);
      }
    })
  );
};
