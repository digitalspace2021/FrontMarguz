import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCalendar, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registro-profesor',
  templateUrl: './registro-profesor.component.html',
  styleUrls: ['./registro-profesor.component.scss'],
})
export class RegistroProfesorComponent implements OnInit {
  //-------------icon
  icon = faPlusCircle;
  horarios = [
    {
      dia: 'Lunes',
      inicio: '8:00am',
      cierre: '2:00pm',
    },
  ];

  calendar = faCalendar;
  user = faUserPlus;
  //----------------------------
  isRegistroExitoso: boolean = false;
  registroExitosoMessage: string =
    'Su cuenta ingresará a un proceso de validación y en tiempo de 10 días o una semana su cuenta quedará habilitada, ' +
    'para empezar por favor revise su bandeja de entrada para validar su correo electrónico.';
  isError: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.isRegistroExitoso = false;
    this.router.navigate(['/auth/login']);
  }

  /*validate() {
    if (this.fRegistro.nombre.errors && this.fRegistro.nombre.errors.required)
      return false;
    if (
      this.fRegistro.apellido.errors &&
      this.fRegistro.apellido.errors.required
    )
      return false;
    if (this.fRegistro.email.errors && this.fRegistro.email.errors.required)
      return false;
    if (
      this.fRegistro.telefono.errors &&
      this.fRegistro.telefono.errors.required
    )
      return false;
    if (
      this.fRegistro.contrasena.errors &&
      this.fRegistro.contrasena.errors.required
    )
      return false;
    return true;
  }*/

  registrar(value: any) {
    try {
      let registroForm = new FormGroup(value.form);

      let formData = new FormData();
      debugger;
      formData.append('name', registroForm.get('nombre')?.value);
      formData.append('lastname', registroForm.get('apellido')?.value);
      formData.append('email', registroForm.get('email')?.value);
      formData.append('password', registroForm.get('contrasena')?.value);
      formData.append(
        'password_confirmation',
        registroForm.get('contrasenaConfim')?.value
      );
      formData.append(
        'identification',
        registroForm.get('identificacion')?.value
      );
      formData.append('cellphone', registroForm.get('telefono')?.value);
      formData.append('country', registroForm.get('pais')?.value);
      formData.append('state', registroForm.get('estado')?.value);
      formData.append('city', registroForm.get('ciudad')?.value);
      formData.append('photo_acount', registroForm.get('fotoPerfil')?.value);
      formData.append(
        'pdf_identification',
        registroForm.get('docuCedula')?.value
      );
      formData.append('pdf_documentation', registroForm.get('hojaVida')?.value);
      formData.append('schedules_available', value.horarios);
      formData.append('languajes', value.idiomas);

      this.authService
        .registrarTeacher(formData)
        .then((resp: any) => {
          if (resp.code == 200) {
            this.openConfirm();
          } else {
            this.openError(resp.message);
          }
        })
        .catch((e) => this.openError(e.message));
    } catch (e: any) {
      this.openError(e.message);
    }
  }

  openConfirm() {
    this.isRegistroExitoso = true;
  }

  openError(message: string) {
    this.errorMessage = message;
    this.isError = true;
  }

  isHorario: boolean = false;
  openHorario() {
    this.isHorario = true;
  }
  closeHorario(horarios: any) {
    this.isHorario = false;
    this.horarios = horarios;
  }

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
