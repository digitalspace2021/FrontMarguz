import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.scss'],
})
export class RegistroEstudianteComponent implements OnInit {
  countries: any;
  states: any;
  cities: any;

  countrySelected: string = '';
  stateSelected: string = '';
  citySelected: string = '';

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
      .then((data) => (this.states = data))
      .catch((err) => console.error(err));
  }

  changeCites() {
    this.authService
      .getCities(this.stateSelected)
      .then((data) => (this.cities = data))
      .catch((err) => console.error(err));
  }
  isRegistroExitoso: boolean = false;
  registroExitosoMessage: string = 'Su cuenta ha sido registrada exitosamente';
  login() {
    this.isRegistroExitoso = false;
    this.router.navigate(["/auth/login"])
  }  
  async registrar(){
    this.openConfirm();
  }
  openConfirm() {
    this.isRegistroExitoso = true;
  }

  isError: boolean = false;
  errorMessage: string = '';
  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
