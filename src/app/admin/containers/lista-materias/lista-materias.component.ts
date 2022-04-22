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
import { MateriaService } from '../../services/materia.service';
import Swal from 'sweetalert2';
import { result } from 'src/app/auth/interfaces/auth.interface';

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
  materias: any;
  materiaItem: Materia = new Materia();
  title?: string;
  action: boolean = false;
  titleConfirm: string = '';
  confirmMessage: string = '';
  isConfirm: boolean = false;

  page?: number;

  constructor(private materiaSv: MateriaService) {}

  openConfirm(title: string, message: string) {
    this.titleConfirm = title;
    this.confirmMessage = message;
    this.isConfirm = true;
  }

  closeConfirm() {
    this.isConfirm = false;
  }

  ngOnInit(): void {
    this.listMateria();
  }

  ngOnChanges() {
    this.listMateria();
  }

  listMateria() {
    this.materiaSv.listInteresOrLenguages().subscribe((resp) => {
      this.materias = resp.result;
    });
  }

  mostrarModal(title: string, action: boolean = false, mat: any = []) {
    this.title = title;
    this.action = action; // si su valor esta en false es un nuevo registro de lo contrario un update
    this.materiaItem = mat;
  }

  deleteMateria(id: number) {
    if (this.materiaItem) {
      this.materiaSv.deleteInteresOrLenguages(id).subscribe(() => {
            this.openConfirm('Eliminar Materia', 'Materia Eliminada exitosamente');
            this.listMateria();
      });
    }
  }
}
