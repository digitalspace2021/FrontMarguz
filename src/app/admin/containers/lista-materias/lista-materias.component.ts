import { Component, OnInit } from '@angular/core';
import {
  faSortDown,
  faUserCheck,
  faMinus,
  faWindowClose,
  faEdit,
  faTrashAlt,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Materia } from '../../interfaces/IMateria';
import { MateriaService } from '../../services/materia.service';

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
  add = faPlusCircle;
  materias: Materia[] = [];

  title?: string;
  show: boolean = false;

  constructor(private materiaSv: MateriaService) {}

  ngOnInit(): void {
    this.materiaSv
      .listMateria()
      .subscribe((resp) => (this.materias = resp.materias));
  }

  mostrarModal(title: string) {
    this.title = title;
  }
}
