import { IMateria } from './../../interfaces/IMateria';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Materia } from '../../class/Materia';
import { MateriaService } from '../../services/materia.service';
import Swal from 'sweetalert2';
import { ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.scss'],
})
export class AgregarMateriaComponent implements OnInit {
  @Input() title?: string;
  @ViewChild('ModalClose') ModalClose?: ElementRef;
  @Output() response : EventEmitter<IMateria> = new EventEmitter()
  materiaInput: string = '';
  val?: boolean = false;
  constructor(private materiaSv: MateriaService) {}

  ngOnInit(): void {}

  register() {
    if (this.materiaInput != '') {
      this.val = false;
      let materia = new Materia();
      materia.materia = this.materiaInput;
      this.materiaSv.createMateria(materia).subscribe((resp) => {
        if (resp) {
          this.response.emit(resp);
          Swal.fire('Registro exitoso...', 'Guardar', 'success').then(() => {
            this.ModalClose?.nativeElement.click();
          });
        }
      });
    } else {
      this.val = true;
    }
  }
}
