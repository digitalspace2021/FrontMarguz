import { Component, OnInit } from '@angular/core';
import {
  faMinusCircle,
  faPlusCircle,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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

  constructor() {}

  ngOnInit(): void {}
}
