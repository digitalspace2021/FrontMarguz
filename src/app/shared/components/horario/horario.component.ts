import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle, faMinusCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import { global } from 'src/environments/global';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss'],
})
export class HorarioComponent implements OnInit {
  plusIcon = faPlusCircle;
  minusIcon = faMinusCircle;
  saveIcon = faSave;
  @Input() horarios: any = [
    {
      day: 'lunes',
      start: '8:00',
      end: '14:00',
    },
  ];
  @Output() closeHorario = new EventEmitter<string>();

  public hours = global.hours

  constructor() { }

  addHorario() {
    this.horarios.push({
      day: 'lunes',
      start: '8:00',
      end: '12:00',
    });
  }

  eliminarHorario(e: Event, index: number) {
    this.horarios.splice(index, 1)
  }

  ngOnInit(): void { }
  close() {
    this.closeHorario.emit(this.horarios);
  }
}
