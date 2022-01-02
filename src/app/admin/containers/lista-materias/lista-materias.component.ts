import { Component, OnInit } from '@angular/core';
import {
  faSortDown,
  faUserCheck,
  faMinus,
  faWindowClose,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.scss'],
})
export class ListaMateriasComponent implements OnInit {
  icon = faSortDown;
  user = faUserCheck;
  minus = faMinus;
  close = faWindowClose;
  edit = faEdit;
  trash = faTrashAlt;

  materias = [
    { id: 1, mat: 'Frances' },
    { id: 2, mat: 'Aleman' },
    { id: 3, mat: 'Italiano' },
    { id: 4, mat: 'Frances' },
    { id: 5, mat: 'Aleman' },
    { id: 6, mat: 'Italiano' },
    { id: 7, mat: 'Frances' },
    { id: 8, mat: 'Aleman' },
    { id: 9, mat: 'Italiano' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
