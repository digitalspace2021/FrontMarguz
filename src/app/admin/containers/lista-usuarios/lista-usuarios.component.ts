import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faMinusCircle,
  faPlusCircle,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';
import { IDataUsuario } from '../../interfaces/IUsuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {
  icon = faSortDown;
  userIcon = faUserCheck;
  minus = faMinusCircle;
  add = faPlusCircle;
  close = faWindowClose;
  edit = faEdit;
  trash = faTrashAlt;

  tempList: Array<any> = [];
  interestAndLanguages = '';

  tipoUsuario: string = 'Student';
  titleModal: string = ''
  usuarios: any[] = [];
  usuariosSearch: any[] = [];
  data: any[] = [];

  title: string = '';
  tipo: string = '0';
  action: boolean = false;
  showInteretAndLanguagesBrand: boolean = false;

  page?: number;
  typeModal: string = 'create';

  constructor(
    private usuarioSv: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.listUsuario();
  }

  setUser(event: any) {

    let id: string = event.target.value;
    let tempList: Array<any> = [];

    if (event.target.checked) this.tempList.push(id)
    if (!event.target.checked) {
      tempList = this.tempList.filter(data => data != id)
      this.tempList = tempList
    }
  }

  habilitar() {
    this.usuarioSv.habilitar(this.tempList).subscribe((resp: any) => {
      this.openConfirm('Habilitar usuario', 'Usuario habilitado exitosamente');
      this.listUsuario();
      this.tempList = []
    });
  }

  deshabilitar() {
    this.usuarioSv.habilitar(this.tempList).subscribe((resp: any) => {
      this.openConfirm(
        'Cambio de estados',
        'Operación Exitosa'
      );
      this.listUsuario();
      this.tempList = []
    });
  }
  eliminar() {
    this.openConfirm('Eliminar usuario', 'Usuario eliminado exitosamente');
  }
  editar() { }
  isConfirm: boolean = false;
  confirmMessage: string = '';
  titleConfirm: string = '';

  openConfirm(title: string, message: string) {
    this.titleConfirm = title;
    this.confirmMessage = message;
    this.isConfirm = true;
  }
  closeConfirm() {
    this.isConfirm = false;
  }


  listUsuario() {
    this.usuarios = [];
    this.usuariosSearch = [];
    switch (this.tipoUsuario) {
      case 'Admin':
        this.usuarioSv.listUsuarioAdmin().subscribe(
          (resp: any) => (
            (this.usuarios = resp.result.data),
            (this.usuariosSearch = resp.result.data)
            //this.changeTab()
          )
        );

        break;
      case 'Teacher':
        this.usuarioSv.listUsuarioTeacher().subscribe(
          (resp: any) => (
            (this.usuarios = resp.result.data),
            (this.usuariosSearch = resp.result.data)
            //this.changeTab()
          )
        );

        break;

      default:
        this.usuarioSv.listUsuarioStudent().subscribe(
          (resp: any) => (
            (this.usuarios = resp.result.data),
            (this.usuariosSearch = resp.result.data)
            //this.changeTab()
          )
        );
        break;
    }
    /*     this.usuarioSv
      .listUsuario()
      .subscribe(
        (resp) => (
          (this.usuarios = resp.usuarios),
          (this.usuariosSearch = resp.usuarios),
          this.changeTab()
        )
      ); */
  }

  changeTab(tipo: string = 'Student') {
    this.tipoUsuario = tipo;
    this.listUsuario();
    /* this.usuarios = this.usuariosSearch.filter(
      (u) => parseInt(u.tipo_usuario) == tipo
    );*/
  }

  openModal(title: string, action: boolean = false) {
    this.title = title;
    this.action = action; // si su valor esta en false es un nuevo registro de lo contrario un update
  }


  async registrar(value: any) {
    try {
      let registroForm = value.form;

      let formData = new FormData();

      formData.append('name', registroForm.get('nombre')?.value);
      formData.append('lastname', registroForm.get('apellido')?.value);
      formData.append('email', registroForm.get('email')?.value);
      formData.append('password', registroForm.get('contrasena')?.value);
      formData.append(
        'password_confirmation',
        registroForm.get('contrasenaConfim')?.value
      );
      formData.append(
        'identification',
        registroForm.get('identificacion')?.value
      );
      formData.append('cellphone', registroForm.get('telefono')?.value);
      formData.append('country', registroForm.get('pais')?.value);
      formData.append('state', registroForm.get('estado')?.value);
      formData.append('city', registroForm.get('ciudad')?.value);
      formData.append('photo_acount', registroForm.get('fotoPerfil')?.value);

      if (this.tipoUsuario == 'Teacher' || this.tipoUsuario == 'Student') {
        formData.append('languajes', value.idiomas);
      }

      if (this.tipoUsuario == 'Teacher') {
        formData.append(
          'pdf_identification',
          registroForm.get('docuCedula')?.value
        );
        formData.append(
          'pdf_documentation',
          registroForm.get('hojaVida')?.value
        );
        formData.append('schedules_available', value.horarios);
      }

      if (this.tipoUsuario == 'Student') {
        this.authService
          .registrarStudent(formData)
          .then((resp: any) => {
            if (resp.code == 201) {
              this.openConfirmRegistro();
            } else {
              this.openError(resp.message);
            }
          })
          .catch((e) => this.openError(e.message));
      }
      if (this.tipoUsuario == 'Teacher') {
        this.authService
          .registrarTeacher(formData)
          .then((resp: any) => {
            if (resp.code == 201) {
              this.openConfirmRegistro();
            } else {
              this.openError(resp.message);
            }
          })
          .catch((e) => this.openError(e.message));
      }
      if (this.tipoUsuario == 'Admin') {
        this.authService
          .registrarAdmin(formData)
          .then((resp: any) => {
            if (resp.code == 201) {
              this.openConfirmRegistro();
            } else {
              this.openError(resp.message);
            }
          })
          .catch((e: any) => this.openError(e.message));
      }
    } catch (e: any) {
      this.openError(e.message);
    }
  }
  isRegistroExitoso: boolean = false;
  registroExitosoMessage: string = 'Ha registrado correctamente al usuario.';

  openConfirmRegistro() {
    this.isRegistroExitoso = true;
  }
  closeConfirmRegistro() {
    this.isRegistroExitoso = false;
  }
  isError: boolean = false;


  openEdit(): any {

    let usersTypes: any = {
      'Teacher': 'profesores/perfil',
      'Student': 'estudiantes/perfil',
      'Admin': 'profesores/perfil'
    }

    console.log([
      usersTypes,
      this.tipoUsuario,
      usersTypes[this.tipoUsuario]
    ]);

    if (this.tempList.length > 1) this.openError('solo puede seleccionar un usuario para esta accion')
    this.tipoUsuario
    this.router.navigate([usersTypes[this.tipoUsuario]], { queryParams: { id: this.tempList[0] }, queryParamsHandling: 'merge' });
  }

  openRegistro(): any {

    this.titleModal = 'Registrar usuario'
    this.typeModal = 'create'
    this.isRegistro = true;

    // if (type === 'edit') {
    //   if (this.tempList.length <= 0) return false
    //   this.titleModal = 'Actualizar usuario'
    //   this.userService
    //     .getDataForUdate(this.tempList[0])
    //     .then((resp: any) => {
    //       this.data = resp.result
    //       this.typeModal = type
    //       this.isRegistro = true;
    //     })
    //     .catch((e) => this.openError(e.message));
    // }

  }

  closeRegistro() {
    this.isRegistro = false;
  }

  isRegistro: boolean = false;
  errorMessage: string = '';

  openError(message: string) {
    this.isError = true;
    this.errorMessage = message;
  }

  showInteretAndLanguages(user: any) {

    this.interestAndLanguages = ''
    if (this.tipoUsuario == 'Admin') return
    if (this.tipoUsuario == 'Teacher') user.languages.map((el: any) => this.interestAndLanguages += el.name + "\n" + "\r ")
    if (this.tipoUsuario == 'Student') user.interest.map((el: any) => this.interestAndLanguages += el.name + "\n" + "\r ")
    this.showInteretAndLanguagesBrand = true;
  }

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
