import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { faPlusCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';

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
  
  countrySelected: string = '';
  stateSelected: string = '';
  citySelected: string = '';
  isRegistroExitoso: boolean = false;
  registroExitosoMessage: string = 'Su cuenta ha sido registrada exitosamente';
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
      .then((data) => (this.states = data))
      .catch((err) => console.error(err));
  }

  changeCites() {
    this.authService
      .getCities(this.stateSelected)
      .then((data) => (this.cities = data))
      .catch((err) => console.error(err));
  }

  async agregarIntereses() {}

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

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
