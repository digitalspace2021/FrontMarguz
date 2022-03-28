import { UsuarioService } from '../../../admin/services/usuario.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  faCamera,
  faPlusCircle,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { MateriaService } from 'src/app/admin/services/materia.service';
import { InfoProfile } from 'src/app/shared/utils/response';

export interface IIntereses {
  id: number;
  name: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @ViewChild('selectFile') selectFile!: ElementRef<HTMLInputElement>;
  intereses: IIntereses[] = [];

  countries: any;
  states: any;
  cities: any;
  materias: any;

  img?: string = 'https://i.blogs.es/447a66/joeyl_02/1366_2000.jpg';
  //iconos
  add = faPlusCircle;
  save = faSave;
  cam = faCamera;
  //-----------------
  formPerfil!: FormGroup;
  infoProfile: any = new InfoProfile();

  constructor(
    private authService: AuthService,
    private buildForm: FormBuilder,
    private usuarioSv: UsuarioService,
    private materiaSv: MateriaService
  ) { }

  ngOnInit() {
    this.builder();
    this.getUser();
    this.listMateria();
  }

  getUser() {
    // TODO// make dinamical get id for get data fromcurrent user 
    this.usuarioSv
      .getUsuario()
      .subscribe((resp: any) => this.loadData(resp));
  }

  loadData(data: any) {

    this.infoProfile = data;

    this.formPerfil.get('id')?.setValue(this.infoProfile.acount.identification);
    this.formPerfil.get('apellido')?.setValue(this.infoProfile.lastname);
    this.formPerfil.get('nombre')?.setValue(this.infoProfile.name);
    this.formPerfil.get('telefono')?.setValue(this.infoProfile.acount.cellphone);
    this.formPerfil.get('email')?.setValue(this.infoProfile.email);
    // this.formPerfil.get('pais')?.setValue(this.infoProfile.acount.country);
    // this.formPerfil.get('estado')?.setValue(this.infoProfile.acount.state);
    // this.formPerfil.get('ciudad')?.setValue(this.infoProfile.acount.city);
    this.formPerfil.get('zona')?.setValue(this.infoProfile.zona_horaria);
    this.changerCountrys();
    // this.formPerfil.get('descripcion')?.setValue(this.infoProfile.descripcion);
    //this.img = this.infoProfile.foto_perfil;
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

  AddIntereses(value: any) {
    if (this.intereses.includes(value)) return;
    this.intereses.push(value);
    const index = this.materias.indexOf(value);
    this.materias.splice(index, 1);
  }

  listMateria() {
    this.materiaSv
      .listInteresOrLenguages()
      .subscribe((resp: any) => (this.materias = resp.result));
  }

  changerCountrys() {
    this.authService
      .getCountries()
      .then((data: any) => {
        this.countries = data.result
        this.formPerfil.get('pais')?.setValue(this.infoProfile.acount.country);
        this.changeStates();
      })
      .catch((err) => console.error(err));
  }

  changeStates() {
    this.authService
      .getStates(this.formPerfil.get('pais')?.value)
      .then((data: any) => {
        this.states = data.result;
        this.formPerfil.get('estado')?.setValue(this.infoProfile.acount.state);
        this.changeCities();
      })
      .catch((err) => console.error(err));
  }

  changeCities() {
    this.authService
      .getCities(this.formPerfil.get('estado')?.value)
      .then((data: any) => {
        this.cities = data.result;
        this.formPerfil.get('ciudad')?.setValue(this.infoProfile.acount.city);
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
}
