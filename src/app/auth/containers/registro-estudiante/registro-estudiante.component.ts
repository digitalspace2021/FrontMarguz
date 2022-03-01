import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { faPlusCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.scss'],
})
export class RegistroEstudianteComponent implements OnInit {
  countries: any;
  states: any;
  cities: any;

  // -----icon
  user = faUserPlus;
  icon = faPlusCircle;
  //---------------
  registroForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
  });
  countrySelected: string = '';
  stateSelected: string = '';
  citySelected: string = '';
  isRegistroExitoso: boolean = false;
  registroExitosoMessage: string =
    'Su cuenta ha sido registrada exitosamente, por favor revise su bandeja de entrada para validar su correo electrónico.';
  isError: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService
      .getCountries()
      .then((data) => {
        this.countries = data;
        this.countrySelected = 'Colombia';
        this.changeStates();
      })
      .catch((err) => console.error(err));
  }

  changeStates() {
    this.authService
      .getStates(this.countrySelected)
      .then((data) => {
        this.states = data;
        this.stateSelected = this.states[0].state_name;
        this.changeCities();
      })
      .catch((err) => console.error(err));
  }

  changeCities() {
    this.authService
      .getCities(this.stateSelected)
      .then((data) => {
        this.cities = data;
        this.citySelected = this.cities[0].city_name;
      })
      .catch((err) => console.error(err));
  }

  login() {
    this.isRegistroExitoso = false;
    this.router.navigate(['/']);
  }

  validate() {
    if (this.fRegistro.nombre.errors && this.fRegistro.nombre.errors.required)
      return false;
    if (
      this.fRegistro.apellido.errors &&
      this.fRegistro.apellido.errors.required
    )
      return false;
    if (
      this.fRegistro.telefono.errors &&
      this.fRegistro.telefono.errors.required
    )
      return false;
    if (this.fRegistro.email.errors && this.fRegistro.email.errors.required)
      return false;
    if (
      this.fRegistro.contrasena.errors &&
      this.fRegistro.contrasena.errors.required
    )
      return false;
    return true;
  }

  get fRegistro() {
    return this.registroForm.controls;
  }

  async registrar(value: any) {
    try {
      let registroForm = new FormGroup(value.form);

      let arrayIdioma = value.idiomas;
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

      arrayIdioma.forEach((elements: any, index: any) => {
        formData.append('languajes[' + index + ']', elements.id);
      });

      this.authService
        .registrarStudent(formData)
        .then((resp: any) => {
          if (resp.code == 201) {
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
    this.isError = true;
    this.errorMessage = message;
  }

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
