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
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  user?: any;

  constructor(private router: Router, private auth: AuthService) {}

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
            this.auth.refresh().then((data: any) => {
              if (data.code == 200) {
                jsonUser.token = data.result.token;
                localStorage.setItem('user', JSON.stringify(jsonUser));
                this.intercept(request, next);
              }
            });
          } else {
            this.router.navigateByUrl('auth');
          }
        }
        return throwError(err);
      })
    );
  }
}
