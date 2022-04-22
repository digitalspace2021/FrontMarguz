import { ListaMateriasComponent } from '../../containers/lista-materias/lista-materias.component';
import { Component, Input, OnInit } from '@angular/core';
import { Materia } from '../../class/Materia';
import { MateriaService } from '../../services/materia.service';
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
  registroExitosoMessage: string = 'Ha registrado correctamente al usuario.';
  isRegistroExitoso: boolean = false;

  constructor(
    private materiaSv: MateriaService,
    private materiaL: ListaMateriasComponent
  ) {}

  openConfirmRegistro() {
     this.isRegistroExitoso = true;
  }

  closeConfirmRegistro() {
    this.isRegistroExitoso = false;
  }

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
              this.openConfirmRegistro()
              setTimeout(() => {
                this.closeConfirmRegistro()
                this.materiaL.listMateria();
                this.ModalClose?.nativeElement.click(); 
              }, 1000)
          }
        });
      } else {
        materia = this.materia;
        materia.name = this.materiaInput;
        this.materiaSv.updateInteresOrLenguages(materia).subscribe((resp) => {
          if (resp) {
             this.openConfirmRegistro()
              setTimeout(() => {
                this.closeConfirmRegistro()
                this.materiaL.listMateria();
                this.ModalClose?.nativeElement.click(); 
              }, 1000)
          }
        });
      }
    } else {
      this.val = true;
    }
  }
}
