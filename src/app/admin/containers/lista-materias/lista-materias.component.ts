import { IMateria } from './../../interfaces/IMateria';
import { Component, OnInit, SimpleChanges } from '@angular/core';
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

  resp: any
  constructor(private materiaSv: MateriaService) {}

  ngOnInit(): void {
    this.listMateria();
  }

  ngOnChanges() {
    if(this.resp){
      this.listMateria()
    }
  }

  listMateria() {
    this.materiaSv
      .listMateria()
      .subscribe((resp) => (this.materias = resp.materias));
  }

  mostrarModal(title: string) {
    this.title = title;
  }

  getResponse(event?: any) {
      this.resp = event;
  }
}
