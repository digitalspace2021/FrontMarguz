import { Usuario } from '../../../admin/class/Usuario';
import { IUsuario } from '../../../admin/interfaces/IUsuario';
import { ContainerModule } from '../../../admin/containers/container.module';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILogin } from '../../interfaces/auth.interface';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

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
  verifyExitosoMessage: string = 'Su cuenta ha sido verificada exitosamente';
  isError: boolean = false;
  errorMessage: string = '';
  isVerifyExitosoMessage: boolean = false;

  constructor(private router: Router, private authService: AuthService, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activedRoute.queryParams
      .subscribe(params => {
        if (params.verify) {
          this.openConfirmVerify();
        }
      }
      );
  }

  async dashboard() {
    let jsonUser;
    let firstTime;
    let currentTime = moment().format("YYYY-MM-DD HH:mm");
    let user = localStorage.getItem('user') || undefined;
    
    if (user) { jsonUser = JSON.parse(user);
      firstTime = jsonUser.user.first_log_at;
    }
   console.log(firstTime,currentTime);
    let tipoUsuario = this.authService.getTipoUsuario();
    debugger;
    if (tipoUsuario == 'Admin') {

        this.router.navigate(['admin/admin-usuario']);

    } else if (tipoUsuario == 'Teacher') {
      if(firstTime == currentTime){
        this.router.navigate(["/profesores/perfil?id=" +jsonUser.id]);
      }
      else{
        this.router.navigate(['profesores']);
      }
    } else {
      if(firstTime == currentTime){
        this.router.navigate(["/estudiantes/perfil?id=" +jsonUser.id]);
      }
      else{
        this.router.navigate(['estudiantes']);
      }
     
    }
  }
  /**
   * @return null
   * ******************************
   */

  login() {
    if (this.validate()) {
      let login = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this.authService
        .login(login)
        .then((resp: any) => {
          localStorage.setItem('user', JSON.stringify(resp.result));
          this.openConfirm();
        })
        .catch((e) => {
          let message = 'Error no identificado por favor intente nuevamente o comuniquese con soporte';
          if (e?.message.includes(401)) message = 'correo no verificado'
          if (e?.message.includes(422)) message = 'correo o contraseña no validas'
          this.openError(message);
          this.loginForm.get('email')?.setValue('');
          this.loginForm.get('password')?.setValue('');
        });
    } else {
      this.openError('email o contraseña no validos');
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

  openConfirmVerify() {
    this.isVerifyExitosoMessage = true;
  }

  openError(message: string) {
    this.errorMessage = message;
    this.isError = true;
  }

  closeConfirmVerify() {
    this.isVerifyExitosoMessage = false;
    this.router.navigate([], {
      relativeTo: this.activedRoute,
      queryParams: [],
    });
  }

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
