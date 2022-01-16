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
  tipo: number = 0;
  action: boolean = false;

  constructor(private usuarioSv: UsuarioService) {}

  ngOnInit() {
    this.listUsuario();
  }

  listUsuario() {
    this.usuarioSv
      .listUsuario()
      .subscribe(
        (resp) => (
          (this.usuarios = resp.usuario),
          (this.usuariosSearch = resp.usuario),
          this.changeTab(1)
        )
      );
  }

  changeTab(tipo: number) {
    this.tipoUsuario = tipo;
    this.usuarios = this.usuariosSearch.filter(
      (u) => parseInt(u.tipo_usuario) == tipo
    );
  }

  openModal(title: string, action: boolean = false) {
    this.title = title;
    this.action = action; // si su valor esta en false es un nuevo registro de lo contrario un update
  }
}
