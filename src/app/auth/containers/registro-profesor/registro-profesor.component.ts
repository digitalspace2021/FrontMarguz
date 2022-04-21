import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCalendar, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { getErrors } from 'src/app/shared/utils/get-errors';

@Component({
  selector: 'app-registro-profesor',
  templateUrl: './registro-profesor.component.html',
  styleUrls: ['./registro-profesor.component.scss'],
})
export class RegistroProfesorComponent implements OnInit {

  env = environment.host;
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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.isRegistroExitoso = false;
    this.router.navigate(['/']);
  }

  registrar(value: any) {
    try {
      let registroForm = value.form;

      let arrayIdioma = value.idiomas;
      let arrayHorario = value.horarios;

      let formData = new FormData();
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

      arrayHorario.forEach((elements: any, index: any) => {

        formData.append(
          'schedules_available[' + index + '][day]',
          elements.day
        );
        formData.append(
          'schedules_available[' + index + '][start]',
          elements.start
        );
        formData.append(
          'schedules_available[' + index + '][end]',
          elements.end
        );
      });

      arrayIdioma.forEach((elements: any, index: any) => {
        formData.append('languajes[' + index + ']', elements.id);
      });

      this.authService
        .registrarTeacher(formData)
        .then((resp: any) => {
          if (resp.code == 201) {
            this.openConfirm();
          } else {
            this.openError(resp.message);
          }
        })
        .catch((e) => this.openError(getErrors(e)));
    } catch (e: any) {
      this.openError(e.message);
    }
  }

  openConfirm() {
    this.isRegistroExitoso = true;
  }
  goToPolicies() {
    window.open(`/public/politicas/profesor`, "_blank");
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
