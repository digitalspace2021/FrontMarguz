import {
  faMinus,
  faSortDown,
  faUserCheck,
  faWindowClose,
  faEdit,
  faEye,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-pagos',
  templateUrl: './lista-pagos.component.html',
  styleUrls: ['./lista-pagos.component.scss'],
})
export class ListaPagosComponent implements OnInit {
  eye = faEye;
  edit = faEdit;
  search = faSearch;

  pagos: any;
  //materiaItem: Materia = new Materia();
  title?: string;
  action: boolean = false;
  titleConfirm: string = '';
  confirmMessage: string = '';
  isConfirm: boolean = false;
  page?: number;

  constructor() {}

  ngOnInit(): void {}
}
