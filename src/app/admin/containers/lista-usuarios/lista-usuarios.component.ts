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

  tipoUsuario: number = 2;
  usuarios: IDataUsuario[] = [];
  usuariosSearch: IDataUsuario[] = [];

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
    this.usuarioSv
      .listUsuario()
      .subscribe(
        (resp) => (
          (this.usuarios = resp.usuarios),
          (this.usuariosSearch = resp.usuarios),
          this.changeTab()
        )
      );
  }

  changeTab(tipo: number = 2) {
    debugger;
    this.tipoUsuario = tipo;
    this.usuarios = this.usuariosSearch.filter(
      (u) => parseInt(u.tipo_usuario) == tipo
    );
  }

  openModal(title: string, action: boolean = false) {
    this.title = title;
    this.action = action; // si su valor esta en false es un nuevo registro de lo contrario un update
  }
  async registrar(usuario: any) {
    try {
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
