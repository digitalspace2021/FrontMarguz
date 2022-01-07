import { IMateria } from './../../interfaces/IMateria';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Materia } from '../../class/Materia';
import { MateriaService } from '../../services/materia.service';
import Swal from 'sweetalert2';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.scss'],
})
export class AgregarMateriaComponent implements OnInit {
  @Input() title?: string;
  @Input() materia: Materia = new Materia();
  @Input() action: boolean = false;
  @ViewChild('ModalClose') ModalClose?: ElementRef;
  @Output() response: EventEmitter<IMateria> = new EventEmitter();

  materiaInput: string = '';
  val: boolean = false;

  constructor(private materiaSv: MateriaService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.action) {
      this.materiaInput = this.materia.materia;
    } else {
      this.materiaInput = '';
    }
  }

  register() {
    if (this.materiaInput != '') {
      let materia = new Materia();
      this.val = false;
      // valida que tipo de registro se va a realizar
      if (!this.action) {
        materia.materia = this.materiaInput;
        this.materiaSv.createMateria(materia).subscribe((resp) => {
          if (resp) {
            this.response.emit(resp);
            Swal.fire('Registro exitoso...', 'Guardado', 'success').then(() => {
              this.ModalClose?.nativeElement.click();
            });
          }
        });
      } else {
        materia = this.materia;
        this.materiaSv.updateMateria(materia).subscribe((resp) => {
          if (resp) {
            this.response.emit(resp);
            Swal.fire('Registro exitoso...', 'Actualizado', 'success').then(
              () => {
                this.ModalClose?.nativeElement.click();
              }
            );
          }
        });
      }
    } else {
      this.val = true;
    }
  }
}
