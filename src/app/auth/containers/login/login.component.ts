import { Usuario } from '../../../admin/class/Usuario';
import { IUsuario } from '../../../admin/interfaces/IUsuario';
import { ContainerModule } from '../../../admin/containers/container.module';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILogin } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isInicioExitoso: boolean = false;
  inicioExitosoMessage: string = 'Ha iniciado sesión exitosamente';
  isError: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  async dashboard() {
    let tipoUsuario = this.authService.getTipoUsuario();
    if (tipoUsuario == "Admin") {
      this.router.navigate(['admin/admin-usuario']);
    } else if (tipoUsuario == "Teacher") {
      this.router.navigate(['profesores']);
    } else {
      this.router.navigate(['estudiantes']);
    }
  }
  /**
   * @return null
   * ******************************
   */

  login() {
    try {
      if (!this.validate())
        throw new Error(
          'Hay errores en su formulario. Por favor revíselo e intente de nuevo'
        );

      let login = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.authService
        .login(login)
        .then((resp: any) => {
          if (resp.code == 200) {
            /* if(!resp.result.user.email_verified_at){
              this.openError('Usuario con correo no validado. Por favor, valide su correo e intente de nuevo.');
              return;
            } */
            localStorage.setItem('user', JSON.stringify(resp.result));
            this.openConfirm();
          } else {
            this.openError(resp.message);
          }
        })
        .catch((e) =>
         this.openError(e.message)
         );
    } catch (e: any) {
      console.log(e)
      this.openError(e.message);
    }
  }

  validate() {
    if (this.fLogin.email.errors && this.fLogin.email.errors.required)
      return false;
    if (this.fLogin.password.errors && this.fLogin.password.errors.required)
      return false;
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

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
