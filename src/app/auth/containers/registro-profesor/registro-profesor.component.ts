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
  countries: any;
  states: any;
  cities: any;

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
    'Su cuenta ingresará a un proceso de validación y en tiempo de 10 días o una semana su cuenta quedará habilitada, para empezar por favor revise su bandeja de entrada para validar su correo electrónico.';

  registroForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    intereses: new FormControl(''),
  });

  countrySelected: string = '';
  stateSelected: string = '';
  citySelected: string = '';
  isError: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  async agregarHorario() {
    this.openHorario();
  }
  async agregarIdiomas() {}

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
    this.router.navigate(['/auth/login']);
  }

  validate() {
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
  }

  get fRegistro() {
    return this.registroForm.controls;
  }

  async registrar() {
    try {
      if (!this.validate())
        throw new Error(
          'Hay errores en su formulario. Por favor revíselo e intente de nuevo'
        );
      this.openConfirm();
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
