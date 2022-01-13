import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData: any = {
    email: '',
    password: '',
  };
  loginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });
;

  isInicioExitoso: boolean = false;
  inicioExitosoMessage: string = 'Ha iniciado sesión exitosamente';
  isError: boolean = false;
  errorMessage: string = '';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}
  async dashboard() {
    this.router.navigate(['admin/admin-usuario']);
  
  }
  async login() {
    try {
      if(!this.validate()) throw new Error('Hay errores en su formulario. Por favor revíselo e intente de nuevo');

      this.authService.login(this.loginData);
      this.openConfirm();
    } catch (e: any) {
      this.openError(e.message);
    }
  }

  validate() {
    if(this.fLogin.email.errors && this.fLogin.email.errors.required) return false
    if(this.fLogin.password.errors && this.fLogin.password.errors.required) return false
    return true;
  }

  get fLogin() {
    return this.loginForm.controls;
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
