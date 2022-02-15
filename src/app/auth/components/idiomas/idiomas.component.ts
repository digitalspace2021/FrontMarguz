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
  @Input() idiomasAsing: any = [];
  @Input() isProfesor: boolean = false;
  @Output() closeIdiomas = new EventEmitter();
  idiomasDisponibles: any;
  idiomasSeleccionados: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.idiomas.forEach((element: any) => {
      this.AddIntereses(element.name);
    });
  }

  AddIntereses(value: any) {
    if (this.idiomasAsing.includes(value)) return;
    this.idiomasAsing.push(value);
    const index = this.idiomasDisponibles.indexOf(value);
    this.idiomasDisponibles.splice(index, 1);
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
