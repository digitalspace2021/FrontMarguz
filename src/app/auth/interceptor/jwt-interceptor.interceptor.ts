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
/*TODO: CREAR LOGICA PARA AGREGAR TOKEN SEGUN WITHCREDENTIALS */
      if (jsonUser.access_token) {
        req = request.clone({
          setHeaders: {
            authorization: 'Bearer ' + jsonUser.access_token,
          },
        });
      }
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.auth.forceLogout();
          this.router.navigate(['/']);
        }
        return throwError(err);
      })
    );
  }
}
