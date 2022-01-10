import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData: any = {
    email: "",
    password: ""
  };

  isInicioExitoso: boolean = false;
  inicioExitosoMessage: string =
    'Ha iniciado sesión exitosamente';
  isError: boolean = false;
  errorMessage: string = '';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}
  async dashboard() {
    this.router.navigate(['admin/admin-usuario']);
  }
  async login() {
    this.authService.login(this.loginData);
    this.openConfirm();
  }
  openConfirm() {
    this.isInicioExitoso = true;
  }

  openError(message: string) {
    this.errorMessage = message;
    this.isError = true;
  }

  isHorario: boolean = false;
  openExitoso() {
    this.isInicioExitoso = true;
  }
  async closeExitoso(horarios: any) {
    this.isInicioExitoso = false;
    await this.dashboard();
  }

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
