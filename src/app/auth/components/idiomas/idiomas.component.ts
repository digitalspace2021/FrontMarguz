import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  faPlusCircle,
  faMinusCircle,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { MateriaService } from 'src/app/admin/services/materia.service';
@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss'],
})
export class IdiomasComponent implements OnInit {
  plusIcon = faPlusCircle;
  minusIcon = faMinusCircle;
  saveIcon = faSave;
  @Input() idiomas: any = [];
  @Input() isProfesor: boolean = false;
  idiomasDisponibles: any;
  @Output() closeIdiomas = new EventEmitter();
  constructor(private materiaSv: MateriaService) {}

  ngOnInit(): void {
    this.idiomasDisponibles = [
      { materia: 'Español' },
      { materia: 'Inglés' },
      { materia: 'Portugués' },
      { materia: 'Italiano' },
      { materia: 'Japonés' },
    ];

    /*     this.materiaSv
      .listMateria()
      .subscribe((resp) => (this.idiomasDisponibles = resp.materias)); */
  }
  addIdioma(idioma:string) {
      if (this.isProfesor && this.idiomas.length == 3) {
        this.openError('No puede escoger más de 3 idiomas');
      } else{
        this.idiomas.push(idioma);
      }
  }
  close() {
    this.closeIdiomas.emit(this.idiomas);
  }
  isError: boolean = false;

  errorMessage: string = "";
  openError(message: string) {
    this.isError = true;
    this.errorMessage = message;
  }

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
