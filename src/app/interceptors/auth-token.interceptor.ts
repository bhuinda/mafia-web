import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../shared/services/auth';

// export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
// 	const authService = inject(AuthService);
// 	const authToken = authService.getToken();

// 	const authReq = authToken
// 		? req.clone({
// 				headers: req.headers.set('Authorization', `Bearer ${authToken}`),
// 		  })
// 		: req;
// 	return next(authReq);
// };
