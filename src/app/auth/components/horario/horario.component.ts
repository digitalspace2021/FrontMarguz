import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle, faMinusCircle, faSave } from '@fortawesome/free-solid-svg-icons';
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
      dia: 'Lunes',
      inicio: '8:00am',
      cierre: '2:00pm',
    },
  ];
  @Output() closeHorario = new EventEmitter<string>();
  constructor() {}

  addHorario() {
    this.horarios.push({
      dia: 'Lunes',
      inicio: '8:00am',
      cierre: '2:00pm',
    });
  }

  eliminarHorario(e: Event, index: number){
    this.horarios.splice(index, 1)
  }

  ngOnInit(): void {}
  close() {
    this.closeHorario.emit(this.horarios);
  }
}