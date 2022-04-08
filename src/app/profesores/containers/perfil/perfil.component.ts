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
import { ActivatedRoute, Params } from '@angular/router';


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
    private materiaSv: MateriaService,
    private route: ActivatedRoute
  ) { }

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

    let myParams: any = null
    this.route.queryParamMap
      .subscribe((params) => {
        let obj: any = { ...params.keys, ...params }
        myParams = obj.params.id
      });

    this.usuarioSv
      .getUsuario(myParams)
      .subscribe((resp) => this.loadData(resp));
  }

  loadData(data: any) {
    console.log(data);
    this.formPerfil.get('id')?.setValue(data.result.id);
    this.formPerfil.get('apellido')?.setValue(data.result.apellido);
    this.formPerfil.get('nombre')?.setValue(data.result.nombre);
    this.formPerfil.get('telefono')?.setValue(data.result.telefono);
    this.formPerfil.get('email')?.setValue(data.result.email);
    this.formPerfil.get('pais')?.setValue(data.result.acount.country);
    this.formPerfil.get('estado')?.setValue(data.result.acount.state);
    this.formPerfil.get('ciudad')?.setValue(data.result.acount.city);
    this.formPerfil.get('zona')?.setValue(data.result.zona_horaria);
    this.formPerfil.get('descripcion')?.setValue(data.result.descripcion);
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
      .listInteresOrLenguages()
      .subscribe((resp) => (this.materias = resp));
    this.changerCountrys();
  }

  changerCountrys() {
    this.authService
      .getCountries()
      .then((data: any) => {
        console.log(data.result);
        this.countries = data.result;
        // this.formPerfil.get('pais')?.setValue('Colombia');


        console.log(
          this.formPerfil.get('pais')?.value
        );

        this.changeStates();
      })
      .catch((err) => console.error(err));
  }

  changeStates() {
    console.log(this.formPerfil.get('pais')?.value);
    this.authService
      .getStates(0)
      // .getStates(this.formPerfil.get('pais')?.value)
      .then((data: any) => {
        this.states = data.result;
        // this.formPerfil.get('estado')?.setValue(this.states[0].state_name);
        this.changeCities();
      })
      .catch((err) => console.error(err));
  }

  changeCities() {
    this.authService
      .getCities(0)
      .then((data: any) => {
        this.cities = data.result;
        // this.formPerfil.get('ciudad')?.setValue(this.cities[0].city_name);
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
