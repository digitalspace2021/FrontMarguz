import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { faPray } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-registro-profesor',
  templateUrl: './registro-profesor.component.html',
  styleUrls: ['./registro-profesor.component.scss'],
})
export class RegistroProfesorComponent implements OnInit {
  countries: any;
  states: any;
  cities: any;

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

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.countries = await this.authService.getCountries();
    this.countrySelected = "Colombia";
    await this.countryChange()
  }
  async register() {}
  async countryChange() {
    this.stateSelected = ""
    this.citySelected = ""
    console.log("changing")
    this.states = await this.authService.getStates(this.countrySelected);
    if(this.states.length == 0) {
      alert(`Información de estados del paìs ${this.countrySelected} no disponibles`);
      return
    }
    this.stateSelected = this.states[0].state_name;
    await this.stateChange()
  }
  async stateChange() {
    this.cities = await this.authService.getCities(this.stateSelected);
    if(this.cities.length == 0) {
      alert(`Información de ciudades del estad ${this.stateSelected} no disponibles`);
      return
    }
    this.citySelected = this.cities[0].city_name;
  }
}
