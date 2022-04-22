import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { getErrors } from 'src/app/shared/utils/get-errors';

@Component({
  selector: 'app-resetear-contrasena',
  templateUrl: './resetear-contrasena.component.html',
  styleUrls: ['./resetear-contrasena.component.scss'],
})
export class ResetearContrasenaComponent implements OnInit {
  email!: string;
  isReseteoExitoso: boolean = false;
  reseteoExitosoMessage: string =
    'Se le ha enviado un correo con las intrucciones para restaurar su contraseña';
  isError: boolean = false;
  errorMessage: string = '';
  load = false;

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  back(): void {
    this.location.back();
  }

  login() {
    this.isReseteoExitoso = false;
    this.router.navigate(['/']);
  }

  // TODO: complementa
  resetear() {
    this.load = true
    this.authService
      .resetPassword(this.email).subscribe(
        data => this.isReseteoExitoso = true,
        err => {
          this.load = false
          if (err.status == 200) this.isReseteoExitoso = true
          if (err.status != 200) this.openError(getErrors(err.error.errors))
        }
      )
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
