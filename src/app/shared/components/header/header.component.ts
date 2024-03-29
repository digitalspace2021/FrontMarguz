import { environment } from './../../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  icon = faSortDown;
  mnuActive?: number;
  logoLink: string = '';
  isPublic: boolean = false;
  isProfesor: boolean = false;
  isAuth: boolean = false;
  isAdmin: boolean = false;
  isEstudiante: boolean = false;
  dataUsuario?: any;
  usuario?: string;
  fotoLink?: string;

  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.setState();
  }

  initState() {
    this.logoLink = '';
    this.isPublic = false;
    this.isProfesor = false;
    this.isAuth = false;
    this.isAdmin = false;
    this.isEstudiante = false;
  }

  setState() {
    this.initState();
    let isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      this.dataUsuario = localStorage.getItem('user');
      this.dataUsuario = JSON.parse(this.dataUsuario);
      this.usuario =
        this.dataUsuario.user.name + ' ' + this.dataUsuario.user.lastname;

      this.fotoLink = this.dataUsuario.user.acount.url_photo_perfil
        ? environment.media + this.dataUsuario.user.acount.url_photo_perfil
        : 'assets/avatar-icon.jpg';

      let tipoUsuario = this.authService.getTipoUsuario();

      switch (tipoUsuario) {
        case 'Admin':
          this.isAdmin = true;
          this.logoLink = 'admin/';
          break;
        case 'Teacher':
          this.isProfesor = true;
          this.logoLink = 'profesores/';
          break;
        default:
          this.isEstudiante = true;
          this.logoLink = 'estudiantes/';
          break;
      }
    } else {
      this.isPublic = true;
    }
  }

  menuActive(mnu: number) {
    this.mnuActive = mnu;
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']);
  }
}
