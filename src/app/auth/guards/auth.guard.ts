import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user?: any;
  whitelist = [
    '/',
    '/registro',
    '/registro/profesores',
    '/registro/estudiantes',
    '/public',
    '/perfil/:',
    '/politicas/estudiante',
    '/politicas/profesor',
    '/politicas/pago',
  ];
  constructor(public auth: AuthService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user = localStorage.getItem('user') || undefined;
    if (
      !this.user &&
      (state.url.includes('admin') ||
        state.url.includes('profesores') ||
        state.url.includes('estudiantes'))
    ) {
      this.router.navigate(['/']);
      return false;
    }
    if (this.user && state.url == '/') {
      let tipo = this.auth.getTipoUsuario();
      switch (tipo) {
        case 'Admin':
          this.router.navigate(['/admin']);

          break;
        case 'Teacher':
          this.router.navigate(['/profesores']);

          break;

        default:
          this.router.navigate(['/estudiantes']);
          break;
      }
    }
    return true;
  }
}
