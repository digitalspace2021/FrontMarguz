import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import {
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { MateriaService } from 'src/app/admin/services/materia.service';
@Component({
  selector: 'app-idiomas-modal',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss'],
})
export class IdiomasModalComponent implements OnInit {


  faTimes = faTimes;


  @Input() idiomas: any = [];
  @Input() isProfesor: boolean = false;
  @Output() closeIdiomas = new EventEmitter();
  idiomasDisponibles: any;
  idiomasSeleccionados: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    /*     this.idiomas.forEach((element: any) => {
          this.AddIntereses(element.name);
        }); */
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

  emit(idiomas: any) {
    this.closeIdiomas.emit(idiomas);
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
