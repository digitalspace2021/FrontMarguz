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
import { Materia } from '../../class/Materia';
import { IDataMateria } from '../../interfaces/IMateria';
import { MateriaService } from '../../services/materia.service';
import Swal from 'sweetalert2';

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
  materias: IDataMateria[] = [];
  materiaItem: Materia = new Materia();
  title?: string;
  action: boolean = false;

  constructor(private materiaSv: MateriaService) {}

  ngOnInit(): void {
    this.listMateria();
  }

  ngOnChanges() {
      this.listMateria();
  }

  listMateria() {
    this.materiaSv
      .listMateria()
      .subscribe((resp) => (this.materias = resp.materias));
  }

  mostrarModal(title: string, action: boolean = false) {
    this.title = title;
    this.action = action; // si su valor esta en false es un nuevo registro de lo contrario un update
  }

  getItem(item: any) {
    this.materiaItem = item;
  }

  deleteMateria() {
    if (this.materiaItem) {
      this.materiaSv.deleteMateria(this.materiaItem.id).subscribe((resp) => {
        Swal.fire('Registro eliminado con exito', 'Eliminar', 'success').then(
          () => {
            this.listMateria();
          }
        );
      });
    }
  }
}
