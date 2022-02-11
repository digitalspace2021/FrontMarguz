import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  user?: any;

  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.user = localStorage.getItem('user') || undefined;
    let req = request;
    let jsonUser: any;

    if (this.user) {
      jsonUser = JSON.parse(this.user);

      if (jsonUser.token) {
        req = request.clone({
          setHeaders: {
            authorization: 'Bearer ' + jsonUser.token,
          },
        });
      }
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          if (jsonUser) {
            //--- servicio
            // jsonUser.token = newToken;
            localStorage.setItem('user', JSON.stringify(jsonUser));
          } else {
            this.router.navigateByUrl('auth');
          }
        }
        return throwError(err);
      })
    );
  }
}
