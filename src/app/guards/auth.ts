import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth';
import { NavService } from '@app/shared/services/nav';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const nav = inject(NavService);
  const router = inject(Router);

  return auth.status$.pipe(
    tap(isValid => {
      if (!isValid) {
        nav.history.push({ route: state.url, success: false });
        router.navigate(['/auth']);
      }
    })
  );
};

// TO-DO: Add a workaround so that whenever AuthComponent is redirected to while already on the /auth route, the new error message is displayed.
