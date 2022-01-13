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

@Component({
  selector: 'app-lista-clases',
  templateUrl: './lista-clases.component.html',
  styleUrls: ['./lista-clases.component.scss'],
})
export class ListaClasesComponent implements OnInit {
  clases = [
    {
      id: 0,
      profesor: 'xxxxxx',
      hora: '10:00',
      fecha: '20/10/2021',
      estado: 'Realizada',
      cantidad: 1,
    },
    {
      id: 0,
      profesor: 'xxxxxx',
      hora: '10:00',
      fecha: '20/10/2021',
      estado: 'PostPuesta',
      cantidad: 0,
    },
    {
      id: 0,
      profesor: 'xxxxxx',
      hora: '10:00',
      fecha: '20/10/2021',
      estado: 'Realizada',
      cantidad: 2,
    },
    {
      id: 0,
      profesor: 'xxxxxx',
      hora: '10:00',
      fecha: '20/10/2021',
      estado: 'PostPuesta',
      cantidad: 0,
    },
  ];
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
