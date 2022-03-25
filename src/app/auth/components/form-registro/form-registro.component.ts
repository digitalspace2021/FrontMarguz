import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  faCalendar,
  faPlusCircle,
  faMinusCircle,
  faUserPlus,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { Result } from 'src/app/admin/interfaces/IMateria';
import { MateriaService } from 'src/app/admin/services/materia.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.scss'],
})
export class FormRegistroComponent implements OnInit {



  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('contrasena') ? group.get('contrasena')!.value : null;
    let confirmPass = group.get('contrasenaConfim') ? group.get('contrasenaConfim')!.value : null;
    return pass === confirmPass ? null : { notSame: true };
  };

  @Input() tipoUsuario: string = 'Admin';
  isEstudiante: boolean = false;
  isAdmin: boolean = false;
  isProfesor: boolean = false;
  minusIcon = faMinusCircle;
  @Output() registrar = new EventEmitter();
  countries: any;
  states: any;
  cities: any;

  horarios = [
    {
      day: 'Lunes',
      start: '8:00am',
      end: '2:00pm',
    },
  ];

  idiomas: Array<Result> = [];
  IdiomasAsing: any;

  // -----icon
  user = faUserPlus;
  icon = faPlusCircle;
  faPaperclip = faPaperclip;
  calendar = faCalendar;
  //---------------
  isHorario: boolean = false;
  isIdiomas: boolean = false;

  registroForm: FormGroup = new FormGroup(
    {
      identificacion: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      pais: new FormControl('Colombia', Validators.required),
      estado: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        Validators.email
        //Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
      ),
      contrasena: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(8),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?])[A-Za-z0-9@$!%*#?]{8,}$'
          ),
        ])
      ),
      contrasenaConfim: new FormControl('', Validators.required),
      hojaVida: new FormControl(''),
      fotoPerfil: new FormControl(''),
      docuCedula: new FormControl(''),
    },
    { validators: this.checkPasswords }
  );
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
  ) { }

  ngOnInit() {
    if (this.tipoUsuario == 'Teacher') {
      this.isProfesor = true;
    } else if (this.tipoUsuario == 'Student') {
      this.isEstudiante = true;
    } else {
      this.isAdmin = true;
    }
    this.changerCountrys();
  }


  checkLength() {
    let value =
      this.fRegistro.contrasena.errors?.minlength?.requiredLength >
      this.fRegistro.contrasena.errors?.minlength?.actualLength;
    return value;
  }

  checkIsFormValid() {
    let formValid = this.registroForm.valid;
    let idiomasLength = this.idiomas.length > 0;
    let files = false;
    if (this.isEstudiante) {
      files = this.filename[2] == '';
    } else if (this.isProfesor) {
      files =
        this.filename[0] == '' ||
        this.filename[1] == '' ||
        this.filename[2] == '';
    }

    return !formValid || !idiomasLength || files;
  }

  handleFile(event: any, index: number) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      switch (index) {
        case 0:
          if (file.size > 2048000) {
            this.openError('El arhivo no puede pesar mas de 2Mb');
            return;
          }
          this.registroForm.get('hojaVida')?.setValue(file);
          this.filename[0] = file.name;

          break;
        case 1:
          if (file.size > 2048000) {
            this.openError('El arhivo no puede pesar mas de 2Mb');
            return;
          }
          this.registroForm.get('docuCedula')?.setValue(file);
          this.filename[1] = file.name;
          break;
        default:
          if (file.size > 512000) {
            this.openError('El arhivo no puede pesar mas de 512Kb');
            return;
          }
          const reader: any = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = (rs: any) => {
              const width = rs.currentTarget['width'];
              const height = rs.currentTarget['height'];

              if (width < 250 || height < 250) {
                this.openError(
                  'Las dimensiones de la imagen deben ser minimo 250 de ancho por 250 de alto'
                );
                return;
              }
              this.registroForm.get('fotoPerfil')?.setValue(file);
              this.filename[2] = file.name;
            };
          };
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

  async agregarIntereses() { }

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
    // try {
    console.log('submit');
    if (!this.validate()) {
      throw new Error(
        'Hay errores en su formulario. Por favor revíselo e intente de nuevo'
      );
    }

    console.log('submit');

    let value = {
      form: this.registroForm,
      horarios: this.horarios,
      idiomas: this.idiomas,
    };

    console.log(value);

    this.registrar.emit(value);

    // } catch (e: any) {
    //   console.log('submit');
    //   this.openError(e.message);
    // }
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
