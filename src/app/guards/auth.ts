import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth';
import { NavService } from '@app/shared/services/nav';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.status$.pipe(
    tap(isValid => {
      if (!isValid) {
        router.navigate(['/auth']);
      }
    })
  );
};
