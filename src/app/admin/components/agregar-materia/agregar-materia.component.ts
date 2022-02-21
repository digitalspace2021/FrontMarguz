import { ListaMateriasComponent } from '../../containers/lista-materias/lista-materias.component';
import { Component, Input, OnInit } from '@angular/core';
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

  materiaInput: string = '';
  val: boolean = false;

  constructor(
    private materiaSv: MateriaService,
    private materiaL: ListaMateriasComponent
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.action) {
      this.materiaInput = this.materia.name;
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
        materia.name = this.materiaInput;
        this.materiaSv.createInteresOrLenguages(materia).subscribe((resp) => {
          if (resp) {
            Swal.fire('Registro exitoso...', 'Guardado', 'success').then(() => {
              this.materiaL.listMateria();
              this.ModalClose?.nativeElement.click();
            });
          }
        });
      } else {
        materia = this.materia;
        materia.name = this.materiaInput;
        this.materiaSv.updateInteresOrLenguages(materia).subscribe((resp) => {
          if (resp) {
            Swal.fire('Registro exitoso...', 'Actualizado', 'success').then(
              () => {
                this.materiaL.listMateria();
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
