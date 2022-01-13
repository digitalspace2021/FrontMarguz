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
  registroExitosoMessage: string = 'Su cuenta ha sido registrada exitosamente, por favor revise su bandeja de entrada para validar su correo electrónico.';
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

  async agregarIntereses() {}

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

  async registrar() {
    try {
      if (!this.validate())
        throw new Error(
          'Hay errores en su formulario. Por favor revíselo e intente de nuevo'
        );
      let usuario = {
        nombre: this.registroForm.get('nombre')?.value,
        apellido: this.registroForm.get('apellido')?.value,
        telefono: this.registroForm.get('telefono')?.value,
        pais: this.countrySelected,
        estado: this.stateSelected,
        ciudad: this.citySelected,
        email: this.registroForm.get('email')?.value,
        contrasena: this.registroForm.get('contrasena')?.value,
        tipo_usuario: 2,
        foto_perfil: ""
      };

      this.authService.registrar(usuario).then((resp: any) => {
        if (resp.code == 200) {
          this.openConfirm();
        } else {
          this.openError(resp.message);
        }
      }).catch((e) => this.openError(e.message));
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
