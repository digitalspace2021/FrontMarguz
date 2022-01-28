import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horario-contenedor',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss'],
})
export class HorarioComponent implements OnInit {
  horarios: any;
  constructor() {}

  ngOnInit(): void {
    this.horarios = [
      {
        dia: 'Lunes',
        inicio: '8:00am',
        cierre: '2:00pm',
      },
    ];
  }
  guardarHorario(horarios: any) {
    this.horarios = horarios;
  }
}
