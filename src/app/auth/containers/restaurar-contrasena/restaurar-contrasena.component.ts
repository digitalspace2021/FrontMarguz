import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurar-contrasena',
  templateUrl: './restaurar-contrasena.component.html',
  styleUrls: ['./restaurar-contrasena.component.scss'],
})
export class RestaurarContrasenaComponent implements OnInit {
  loginForm!: FormGroup;
  isReseteoExitoso: boolean = false;
  reseteoExitosoMessage: string =
    'Se ha modificado su contraseña correctamente';
  isError: boolean = false;
  errorMessage: string = '';
  token!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    activeRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  restaurar() {
    let data = {
      token: this.token,
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      password_confirmation: this.loginForm.get('password_confirmation')?.value,
    };
    this.authService
      .restaurePassword(data)
      .then(() => {
        this.login();
      })
      .catch((err) => console.error(err));
  }

  login() {
    this.isReseteoExitoso = false;
<<<<<<< HEAD
    this.router.navigate(["/"])
  }  
=======
    this.router.navigate(['/auth/login']);
  }
>>>>>>> 8ec4021c516879209093a60657f5053fb7957977
  openConfirm() {
    this.isReseteoExitoso = true;
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
