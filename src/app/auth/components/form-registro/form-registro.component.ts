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
} from '@fortawesome/free-solid-svg-icons';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
})
export class FormRegistroComponent implements OnInit {
  @Input() tipoUsuario: string = '0';
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
  idiomas = [];
  // -----icon
  user = faUserPlus;
  icon = faPlusCircle;
  calendar = faCalendar;
  //---------------
  registroForm = new FormGroup({
    identificacion: new FormControl('', Validators.required),
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
  @ViewChild('documentacionUpload')
  private documentacionUpload?: AngularFileUploaderComponent;
  @ViewChild('cedulaUpload')
  private cedulaUpload?: AngularFileUploaderComponent;
  @ViewChild('perfilUpload')
  private perfilUpload?: AngularFileUploaderComponent;
  documentacionConfig = {
    uploadAPI: {
      url: 'https://example-file-upload-api',
    },
    theme: 'attachPin',
    replaceTexts: {
      attachPinBtn: 'Examinar o arrastrar',
      sizeLimit: 'Size Limit',
    },
  };
  cedulaConfig = {
    uploadAPI: {
      url: 'https://example-file-upload-api',
    },
    theme: 'attachPin',
    replaceTexts: {
      attachPinBtn: 'Examinar o arrastrar',
      sizeLimit: 'Size Limit',
    },
  };
  perfilConfig = {
    uploadAPI: {
      url: 'https://example-file-upload-api',
    },
    theme: 'attachPin',
    replaceTexts: {
      attachPinBtn: 'Examinar o arrastrar',
      sizeLimit: 'Size Limit',
    },
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.tipoUsuario == '1') {
      this.isProfesor = true;
    } else if (this.tipoUsuario == '2') {
      this.isEstudiante = true;
    } else {
      this.isAdmin = true;
    }
    this.authService
      .getCountries()
      .then((data) => {
        this.countries = data;
        this.countrySelected = 'Colombia';
        this.changeStates();
      })
      .catch((err) => console.error(err));
  }
  resetDocumentacion() {
    if (this.documentacionUpload) this.documentacionUpload.resetFileUpload();
  }
  resetCedula() {
    if (this.cedulaUpload) this.cedulaUpload.resetFileUpload();
  }
  resetPerfil() {
    if (this.perfilUpload) this.perfilUpload.resetFileUpload();
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
        nombre: this.registroForm.get('nombre')?.value,
        apellido: this.registroForm.get('apellido')?.value,
        telefono: this.registroForm.get('telefono')?.value,
        pais: this.countrySelected,
        estado: this.stateSelected,
        ciudad: this.citySelected,
        email: this.registroForm.get('email')?.value,
        contrasena: this.registroForm.get('contrasena')?.value,
        tipo_usuario: this.tipoUsuario,
        foto_perfil: '',
      };
      this.registrar.emit(value);
    } catch (e: any) {
      this.openError(e.message);
    }
  }
  isHorario: boolean = false;
  isIdiomas: boolean = false;
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
