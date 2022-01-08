import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
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
  registroExitosoMessage: string ='Su cuenta ingresará a un proceso de validación y en tiempo de 10 días o una semana su cuenta quedará habilitada';

  registerForm: FormGroup = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    apellido: new FormControl(),
    telefono: new FormControl(),
    email: new FormControl(),
    contrasena: new FormControl(),
    intereses: new FormControl(),
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
      .then((data) => (this.states = data))
      .catch((err) => console.error(err));
  }

  changeCites() {
    this.authService
      .getCities(this.stateSelected)
      .then((data) => (this.cities = data))
      .catch((err) => console.error(err));
  }
  
  login() {
    this.isRegistroExitoso = false;
    this.router.navigate(['/auth/login']);
  }
  async registrar() {
    this.openConfirm();
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
