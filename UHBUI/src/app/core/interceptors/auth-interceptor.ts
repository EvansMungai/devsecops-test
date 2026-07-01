import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedRoutes = ['/', '/login', '/register'];
  const shouldSkip = excludedRoutes.some(route => req.url.endsWith(route));

  const token = localStorage.getItem('token');

  if(!token || shouldSkip) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  );
};
