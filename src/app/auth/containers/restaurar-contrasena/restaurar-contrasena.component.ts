import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurar-contrasena',
  templateUrl: './restaurar-contrasena.component.html',
  styleUrls: ['./restaurar-contrasena.component.scss']
})
export class RestaurarContrasenaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async restaurar(){
    this.openConfirm();
  }
  isReseteoExitoso: boolean = false;
  reseteoExitosoMessage: string = 'Se ha modificado su contraseña correctamente';
  login() {
    this.isReseteoExitoso = false;
    this.router.navigate(["/"])
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
