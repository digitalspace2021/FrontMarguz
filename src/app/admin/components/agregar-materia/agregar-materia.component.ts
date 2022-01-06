import { Component, Input, OnInit } from '@angular/core';
import { Materia } from '../../class/Materia';
import { MateriaService } from '../../services/materia.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.scss'],
})
export class AgregarMateriaComponent implements OnInit {
  @Input() title?: string;
  materiaInput: string = '';
  val?: boolean = false;

  constructor(private materiaSv: MateriaService) {}

  ngOnInit(): void {}

  register() {
    if (this.materiaInput != '') {
      this.val = false;
      let materia = new Materia();
      materia.materia = this.materiaInput;

      console.log(materia);

      this.materiaSv.createMateria(materia).subscribe((resp) => {
        if (resp) {
          Swal.fire('Registro exitoso...', 'Guardar', 'success');
        }
      });
    } else {
      this.val = true;
    }
  }
}
