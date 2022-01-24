import { UsuarioService } from './../../../admin/services/usuario.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  faCamera,
  faPlusCircle,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { MateriaService } from 'src/app/admin/services/materia.service';
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

  constructor(
    private authService: AuthService,
    private buildForm: FormBuilder,
    private usuarioSv: UsuarioService,
    private materiaSv: MateriaService
  ) {}

  ngOnInit() {
    this.builder();
    this.changerCountrys();
    this.getUser();
    this.listMateria();
  }

  getUser() {
    this.usuarioSv
      .getUsuario(24)
      .subscribe((resp) => this.loadData(resp.usuario));
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

  AddIntereses(value: any) {
    if (this.intereses.includes(value)) return;
    this.intereses.push(value);
    const index = this.materias.indexOf(value);
    this.materias.splice(index, 1);
  }

  listMateria() {
    this.materiaSv
      .listMateria()
      .subscribe((resp) => (this.materias = resp.materias));
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
}
