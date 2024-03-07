import { inject } from '@angular/core';
import { CanActivateFn, NavigationExtras, Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.status$.pipe(
    tap(isValid => {
      if (!isValid) {
        const navigationExtras: NavigationExtras = {
          state: { error: `Unauthorized access. Sign in?` }
        };
        router.navigate(['/auth'], navigationExtras);
      }
    })
  );
};

// TO-DO: Add a workaround so that whenever AuthComponent is redirected to while already on the /auth route, the new error message is displayed.
