import { Component, OnInit } from '@angular/core';
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
import { IDataUsuario } from '../../interfaces/IUsuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
})
export class ListaUsuariosComponent implements OnInit {
  icon = faSortDown;
  user = faUserCheck;
  minus = faMinusCircle;
  add = faPlusCircle;
  close = faWindowClose;
  edit = faEdit;
  trash = faTrashAlt;

  tipoUsuario: string = 'Student';
  usuarios: any[] = [];
  usuariosSearch: any[] = [];

  title: string = '';
  tipo: string = '0';
  action: boolean = false;

  page?: number;

  constructor(
    private usuarioSv: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.listUsuario();
  }

  habilitar() {
    this.openConfirm('Habilitar usuario', 'Usuario habilitado exitosamente');
  }
  deshabilitar() {
    this.openConfirm(
      'Deshabilitar usuario',
      'Usuario deshabilitado exitosamente'
    );
  }
  eliminar() {
    this.openConfirm('Eliminar usuario', 'Usuario eliminado exitosamente');
  }
  editar() {}
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
<<<<<<< HEAD
    this.usuarios = [];
    this.usuariosSearch = [];
    switch (this.tipoUsuario) {
      case 'Admin':
        this.usuarioSv
        .listUsuarioAdmin()
        .subscribe(
          (resp:any) => (
            (this.usuarios = resp.result.data),
            (this.usuariosSearch = resp.result.data)
            //this.changeTab()
          )
        );
          
        break;
        case 'Teacher':
          this.usuarioSv
          .listUsuarioTeacher()
          .subscribe(
            (resp:any) => (
              (this.usuarios = resp.result.data),
              (this.usuariosSearch = resp.result.data)
              //this.changeTab()
            )
          );
            
          break;
      
      default:
        this.usuarioSv
        .listUsuarioStudent()
        .subscribe(
          (resp:any) => (
            (this.usuarios = resp.result.data),
            (this.usuariosSearch = resp.result.data)
            //this.changeTab()
          )
        );
          break;
    }
/*     this.usuarioSv
=======
    this.usuarioSv
>>>>>>> f8feb72a880007ea1217c9ccfcb10c6696fb89f1
      .listUsuario()
      .subscribe(
        (resp) => (
          (this.usuarios = resp.usuarios),
          (this.usuariosSearch = resp.usuarios),
          this.changeTab()
        )
      ); */
  }

<<<<<<< HEAD
  changeTab(tipo: string = 'Student') {
    this.tipoUsuario = tipo;
    this.listUsuario();
    /* this.usuarios = this.usuariosSearch.filter(
=======
  changeTab(tipo: number = 2) {
    debugger;
    this.tipoUsuario = tipo;
    this.usuarios = this.usuariosSearch.filter(
>>>>>>> f8feb72a880007ea1217c9ccfcb10c6696fb89f1
      (u) => parseInt(u.tipo_usuario) == tipo
    );
  }

  openModal(title: string, action: boolean = false) {
    this.title = title;
    this.action = action; // si su valor esta en false es un nuevo registro de lo contrario un update
  }
<<<<<<< HEAD
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
            if (resp.code == 200) {
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
            if (resp.code == 200) {
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
            if (resp.code == 200) {
              this.openConfirmRegistro();
            } else {
              this.openError(resp.message);
            }
          })
          .catch((e) => this.openError(e.message));
      }

=======
  async registrar(usuario: any) {
    /* try {
      this.authService
        .registrar(usuario)
        .then((resp: any) => {
          if (resp.code == 200) {
            this.openConfirmRegistro();
            this.listUsuario();
          } else {
            this.openError(resp.message);
          }
          this.closeRegistro();
        })
        .catch((e) => this.openError(e.message));
>>>>>>> f8feb72a880007ea1217c9ccfcb10c6696fb89f1
    } catch (e: any) {
      this.openError(e.message);
    }*/
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
  openRegistro() {
    this.isRegistro = true;
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

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
