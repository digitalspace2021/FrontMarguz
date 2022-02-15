import { MateriaService } from '../../../admin/services/materia.service';
import { UsuarioService } from '../../../admin/services/usuario.service';
import { AuthService } from '../../../auth/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  faCamera,
  faPlusCircle,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

export interface IIntereses {
  id: number;
  materia: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @ViewChild('selectFile') selectFile!: ElementRef<HTMLInputElement>;
  countries: any;
  states: any;
  cities: any;
  materias: any;
  intereses: IIntereses[] = [];

  img?: string = 'https://i.blogs.es/447a66/joeyl_02/1366_2000.jpg';

  //iconos
  add = faPlusCircle;
  save = faSave;
  cam = faCamera;
  //-----------------
  formPerfil!: FormGroup;
  detallesDePago: any;

  constructor(
    private authService: AuthService,
    private buildForm: FormBuilder,
    private usuarioSv: UsuarioService,
    private materiaSv: MateriaService
  ) {}

  ngOnInit(): void {
    this.builder();
    this.changerCountrys();
    this.getUser();
    this.listMateria();
  }

  AddIntereses(value: any) {
    if (this.intereses.includes(value)) return;
    this.intereses.push(value);
    const index = this.materias.indexOf(value);
    this.materias.splice(index, 1);
  }

  getUser() {
    this.usuarioSv
      .getUsuario(24)
      .subscribe((resp) => this.loadData(resp.usuarios));
  }

  loadData(data: any) {
    console.log(data);
    this.formPerfil.get('id')?.setValue(data.id);
    this.formPerfil.get('apellido')?.setValue(data.apellido);
    this.formPerfil.get('nombre')?.setValue(data.nombre);
    this.formPerfil.get('telefono')?.setValue(data.telefono);
    this.formPerfil.get('email')?.setValue(data.email);
    this.formPerfil.get('pais')?.setValue(data.pais);
    this.formPerfil.get('estado')?.setValue(data.estado);
    this.formPerfil.get('ciudad')?.setValue(data.ciudad);
    this.formPerfil.get('zona')?.setValue(data.zona_horaria);
    this.formPerfil.get('descripcion')?.setValue(data.descripcion);
    //this.img = data.foto_perfil;
  }

  builder() {
    this.formPerfil = this.buildForm.group({
      id: [{ value: '', disabled: true }],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      ciudad: ['', Validators.required],
      zona: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  listMateria() {
    this.materiaSv
      .listMateria()
      .subscribe((resp) => (this.materias = resp.result));
    this.changerCountrys();
  }

  changerCountrys() {
    this.authService
      .getCountries()
      .then((data) => {
        this.countries = data;
        this.formPerfil.get('pais')?.setValue('Colombia');
        this.changeStates();
      })
      .catch((err) => console.error(err));
  }

  changeStates() {
    this.authService
      .getStates(this.formPerfil.get('pais')?.value)
      .then((data) => {
        this.states = data;
        this.formPerfil.get('estado')?.setValue(this.states[0].state_name);
        this.changeCities();
      })
      .catch((err) => console.error(err));
  }

  changeCities() {
    this.authService
      .getCities(this.formPerfil.get('estado')?.value)
      .then((data) => {
        this.cities = data;
        this.formPerfil.get('ciudad')?.setValue(this.cities[0].city_name);
      })
      .catch((err) => console.error(err));
  }

  addImagen() {
    const imagen: any = this.selectFile.nativeElement;
    if (typeof FileReader !== 'undefined') {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.img = e.target.result;
      };
      reader.readAsDataURL(imagen.files[0]);
    }
  }

  openFileSystem() {
    this.selectFile.nativeElement.click();
  }
  isPago: boolean = false;
  openPago() {
    this.isPago = true;
  }
  closePago(detallesDePago: any) {
    this.detallesDePago = detallesDePago;
    this.isPago = false;
  }
}
