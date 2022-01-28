import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import {
  faPlusCircle,
  faMinusCircle,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { MateriaService } from 'src/app/admin/services/materia.service';
@Component({
  selector: 'app-idiomas-modal',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss'],
})
export class IdiomasModalComponent implements OnInit {
  plusIcon = faPlusCircle;
  minusIcon = faMinusCircle;
  saveIcon = faSave;
  @Input() idiomas: any = [];
  @Input() isProfesor: boolean = false;
  idiomasDisponibles: any;
  idiomasSeleccionados: any;

  @Output() closeIdiomas = new EventEmitter();
  constructor(
    private materiaSv: MateriaService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

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
    this.idiomasSeleccionados = [...this.idiomasDisponibles].map((x) => false);
    this.changeDetectorRef.detectChanges();
    this.idiomas.forEach((idioma: any) => {
      let index = this.idiomasDisponibles.findIndex(
        (disponible: any) => disponible.materia == idioma
      );
      if (index != -1) {
        this.idiomasSeleccionados[index] = true;
      }
    });
    this.changeDetectorRef.markForCheck();
  }
  handleCheck(index: number) {
    if (this.idiomasSeleccionados[index]) {
      this.addIdioma(this.idiomasDisponibles[index].materia, index);
    } else {
      this.removeIdioma(this.idiomasDisponibles[index].materia);
    }
  }
  removeIdioma(idioma: string) {
    let index = this.idiomas.indexOf(idioma);
    this.idiomas.splice(index, 1);
  }
  addIdioma(idioma: string, index: number) {
    if (this.isProfesor && this.idiomas.length >= 3) {
      this.changeDetectorRef.detectChanges();
      this.idiomasSeleccionados[index] = false;
      this.changeDetectorRef.markForCheck();
      this.openError('No puede escoger más de 3 idiomas');
    } else {
      this.idiomas.push(idioma);
    }
  }
  close() {
    this.closeIdiomas.emit(this.idiomas);
  }
  isError: boolean = false;

  errorMessage: string = '';
  openError(message: string) {
    this.isError = true;
    this.errorMessage = message;
  }

  closeError() {
    this.isError = false;
    this.errorMessage = '';
  }
}
