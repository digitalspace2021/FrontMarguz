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
  faMinusCircle,
  faPlusCircle,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params } from '@angular/router';
import { getErrors } from 'src/app/shared/utils/get-errors';

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
  countries: any;
  states: any;
  cities: any;
  materias: any;
  intereses: IIntereses[] = [];
  isError: boolean = false;
  errorMessage: string = '';
  link: string = '';
  first_log_at!: boolean;

  img: string = 'https://i.blogs.es/447a66/joeyl_02/1366_2000.jpg';

  //iconos
  add = faPlusCircle;
  save = faSave;
  cam = faCamera;
  minus = faMinusCircle;
  //-----------------
  formPerfil!: FormGroup;
  detallesDePago: any;
  user: any;
  myParams: any = null;
  msg: string = '';
  show: boolean = false;
  perfilUpdate: boolean = false;

  dataUsuario?: any;
  role: string = '';
  urlId?: any;

  constructor(
    private authService: AuthService,
    private buildForm: FormBuilder,
    private usuarioSv: UsuarioService,
    private materiaSv: MateriaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.urlId = new URL(location.href).searchParams.get('id');
    this.dataUsuario = localStorage.getItem('user');
    this.dataUsuario = JSON.parse(this.dataUsuario);
    this.role = this.dataUsuario?.user?.role;

    this.builder();
    this.getUser();
    this.listMateria();
  }

  AddIntereses(value: any) {
    if (!this.intereses.find((el: any) => el.id === value.id))
      this.intereses.push(value);
    // const index = this.materias.indexOf(value);
    // this.materias.splice(index, 1);
  }

  SubstrabIntereses(value: any) {
    this.intereses = this.intereses.filter((el: any) => el.id !== value.id);
  }

  // AddIntereses(value: any) {
  //   if (!this.intereses.find((el: any) => el.id === value.id)) this.intereses.push(value);
  //   const index = this.materias.indexOf(value);
  //   this.materias.splice(index, 1);
  // }

  getUser() {
    this.route.queryParamMap.subscribe((params) => {
      let obj: any = { ...params.keys, ...params };
      this.myParams = obj.params.id;
    });

    this.usuarioSv.getUsuario(this.myParams).subscribe((resp) => {
      this.user = resp;
      console.log(this.myParams, 'desde perfil', resp);
      this.loadData(resp);
    });
  }

  loadData(data: any) {
    this.first_log_at = data.result.acount.first_log_at;


    // this.formPerfil.get('identification')?.setValue(data.result.acount.identification);
    // this.formPerfil.get('lastname')?.setValue(data.result.lastname);
    // this.formPerfil.get('name')?.setValue(data.result.name);
    // this.formPerfil.get('cellphone')?.setValue(data.result.acount.cellphone);
    // this.formPerfil.get('title_professional')?.setValue(data.result.acount.title_professional);

    if (!this.first_log_at) {
      this.perfilUpdate = true;
    }
    this.formPerfil
      .get('identification')
      ?.setValue(data.result.acount.identification);
    this.formPerfil.get('lastname')?.setValue(data.result.lastname);
    this.formPerfil.get('name')?.setValue(data.result.name);
    this.formPerfil.get('cellphone')?.setValue(data.result.acount.cellphone);
    this.formPerfil
      .get('title_professional')
      ?.setValue(data.result.acount.title_professional);
    this.formPerfil.get('email')?.setValue(data.result.email);
    this.formPerfil.get('country')?.setValue(data.result.acount.country);
    this.formPerfil.get('state')?.setValue(data.result.acount.state);
    this.formPerfil.get('city')?.setValue(data.result.acount.city);
    this.formPerfil.get('time_zone')?.setValue(data.result.acount.time_zone);
    this.formPerfil
      .get('description')
      ?.setValue(data.result.acount.description);
    this.formPerfil.get('price')?.setValue(data.result.acount.price);
    this.img = data.result.acount.url_photo_perfil;
    this.link = data.result.acount.url_youtube;
    this.changerCountrys();

    data?.result?.acount?.languajes?.forEach((element: any) => {
      this.intereses.push(element);
    });
  }

  builder() {
    this.formPerfil = this.buildForm.group({
      identification: [{ value: '' }],
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      cellphone: ['', Validators.required],
      title_professional: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      time_zone: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      link: ['', Validators.required],
      photo_acount: ['', Validators.required],
    });
  }

  listMateria() {
    this.materiaSv.listInteresOrLenguages().subscribe((resp) => {
      this.materias = resp.result.map((el: any) => {
        return { id: el.id, name: el.name };
      });
    });
  }

  changerCountrys() {
    this.authService
      .getCountries()
      .then((data: any) => {
        this.countries = data.result;
        this.changeStates();
      })
      .catch((err) => console.error(err));
  }

  changeStates() {
    this.authService
      .getStates(this.formPerfil.get('country')?.value)
      .then((data: any) => {
        this.states = data.result;
        this.changeCities();
      })
      .catch((err) => console.error(err));
  }

  changeCities() {
    this.authService
      .getCities(this.formPerfil.get('state')?.value)
      .then((data: any) => {
        this.cities = data.result;
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
      this.formPerfil.get('photo_acount')?.setValue(imagen.files[0]);
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

  update() {
    try {
      let formData = new FormData();

      for (const [key, value] of Object.entries(this.formPerfil.value)) {
        formData.append(key, this.formPerfil.get(key)?.value);
      }

      formData.append('url_youtube', this.link);

      this.intereses.forEach((elements: any, index: any) => {
        formData.append('languajes[' + index + ']', elements.id);
      });

      // this.myParams

      this.authService
        .updateTeacher(formData, this.myParams)
        .then((resp: any) => {
          if (resp.code == 202) {
            this.first_log_at = resp.result.first_log_at;
            this.msg = 'Actualización correcta';
            this.show = true;
          } else {
            this.openError(resp.message);
          }
        })
        .catch((e) => this.openError(getErrors(e)));
    } catch (e: any) {
      this.openError(e.message);
    }
  }

  openError(message: string) {
    this.errorMessage = message;
    this.isError = true;
  }

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
