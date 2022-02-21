import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetear-contrasena',
  templateUrl: './resetear-contrasena.component.html',
  styleUrls: ['./resetear-contrasena.component.scss'],
})
export class ResetearContrasenaComponent implements OnInit {
  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }
  isReseteoExitoso: boolean = false;
  reseteoExitosoMessage: string = 'Se le ha enviado un correo con las intrucciones para restaurar su contraseña';
  login() {
    this.isReseteoExitoso = false;
    this.router.navigate(["/login"])
  }  
  async resetear(){
    this.openConfirm();
  }
  openConfirm() {
    this.isReseteoExitoso = true;
  }

  isError: boolean = false;
  errorMessage: string = '';
  openError(message: string) {
    this.errorMessage = message;
    this.isError = true;
  }

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
