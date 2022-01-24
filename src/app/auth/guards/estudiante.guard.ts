import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})


export class EstudianteGuard implements CanActivate {

  constructor(public auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
/*     if ((this.auth.getTipoUsuario() != "2")) {
      this.router.navigate(["/not-found"]);
      return false;
    } */
    return true;
  }

}
