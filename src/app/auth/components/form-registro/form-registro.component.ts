import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  faCalendar,
  faPlusCircle,
  faMinusCircle,
  faUserPlus,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { IMateria } from 'src/app/admin/interfaces/IMateria';
import { MateriaService } from 'src/app/admin/services/materia.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
})
export class FormRegistroComponent implements OnInit {
  @Input() tipoUsuario: number = 0;
  isEstudiante: boolean = false;
  isAdmin: boolean = false;
  isProfesor: boolean = false;
  minusIcon = faMinusCircle;
  @Output() registrar = new EventEmitter<any>();
  countries: any;
  states: any;
  cities: any;

  horarios = [
    {
      dia: 'Lunes',
      inicio: '8:00am',
      cierre: '2:00pm',
    },
  ];
  idiomas!: IMateria;
  IdiomasAsing: any;

  // -----icon
  user = faUserPlus;
  icon = faPlusCircle;
  faPaperclip = faPaperclip;
  calendar = faCalendar;
  //---------------
  isHorario: boolean = false;
  isIdiomas: boolean = false;

  registroForm = new FormGroup({
    identificacion: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    pais: new FormControl('Colombia', Validators.required),
    estado: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    ),
    contrasena: new FormControl('', Validators.required),
    contrasenaConfim: new FormControl('', Validators.required),
    hojaVida: new FormControl(''),
    fotoPerfil: new FormControl(''),
    docuCedula: new FormControl(''),
  });
  filename = ['', '', ''];
  countrySelected: string = '';
  stateSelected: string = '';
  citySelected: string = '';
  isRegistroExitoso: boolean = false;
  registroExitosoMessage: string =
    'Su cuenta ha sido registrada exitosamente, por favor revise su ' +
    'bandeja de entrada para validar su correo electrónico.';
  isError: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private materiaSv: MateriaService
  ) {}

  ngOnInit() {
    if (this.tipoUsuario == 1) {
      this.isProfesor = true;
    } else if (this.tipoUsuario == 2) {
      this.isEstudiante = true;
    } else {
      this.isAdmin = true;
    }
    this.changerCountrys();
  }

  intereses() {
    this.materiaSv.listInteresOrLenguages().subscribe((data: IMateria) => {
      this.idiomas = data;
    });
  }

  handleFile(event: any, index: number) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      switch (index) {
        case 0:
          this.registroForm.get('hojaVida')?.setValue(file);
          this.filename[0] = file.name;

          break;
        case 1:
          this.registroForm.get('docuCedula')?.setValue(file);
          this.filename[1] = file.name;
          break;
        default:
          this.registroForm.get('fotoPerfil')?.setValue(file);
          this.filename[2] = file.name;
          break;
      }
    }
  }

  resetFile(id: number) {
    switch (id) {
      case 0:
        this.registroForm.get('hojaVida')?.setValue('');
        this.filename[0] = '';
        break;
      case 1:
        this.registroForm.get('docuCedula')?.setValue('');
        this.filename[1] = '';
        break;

      default:
        this.registroForm.get('fotoPerfil')?.setValue('');
        this.filename[2] = '';
        break;
    }
  }

  changerCountrys() {
    this.authService
      .getCountries()
      .then((data) => {
        this.countries = data;
        this.changeStates();
      })
      .catch((err) => console.error(err));
  }

  changeStates() {
    this.authService
      .getStates(this.registroForm.get('pais')?.value)
      .then((data) => {
        this.states = data;
        this.registroForm.get('estado')?.setValue(this.states[0].state_name);
        this.changeCities();
      })
      .catch((err) => console.error(err));
  }

  changeCities() {
    this.authService
      .getCities(this.registroForm.get('estado')?.value)
      .then((data) => {
        this.cities = data;
        this.registroForm.get('ciudad')?.setValue(this.cities[0].city_name);
      })
      .catch((err) => console.error(err));
  }

  async agregarIntereses() {}

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
      this.fRegistro.identificacion.errors &&
      this.fRegistro.identificacion.errors.required
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

  submit() {
    try {
      if (!this.validate())
        throw new Error(
          'Hay errores en su formulario. Por favor revíselo e intente de nuevo'
        );

      let value = {
        form: this.registroForm,
        horarios: this.horarios,
        idiomas: this.idiomas,
      };

      this.registrar.emit(value);
    } catch (e: any) {
      this.openError(e.message);
    }
  }

  openHorario() {
    this.isHorario = true;
  }
  closeHorario(horarios: any) {
    this.isHorario = false;
    this.horarios = horarios;
  }
  closeIdiomas(idiomas: any) {
    this.isIdiomas = false;
    this.idiomas = idiomas;
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
