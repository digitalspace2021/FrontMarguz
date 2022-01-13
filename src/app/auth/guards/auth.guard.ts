import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isAuthenticated() && state.url != "/login") {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
