import { Component, OnInit } from '@angular/core';
import { HorarioService } from './horario.service';
import { UsuarioService } from '../../../admin/services/usuario.service';

@Component({
  selector: 'app-horario-contenedor',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss'],
})
export class HorarioComponent implements OnInit {
  horarios: any;
  id:number = 0;
  constructor( private _schedule: HorarioService, private _user: UsuarioService ) {}

  ngOnInit(): void {
    this.getSchedule();
  }

  getSchedule(){
    this._user.getUsuario()
    .subscribe( (res:any) => {
      this.id = res.id;
      this.horarios = res.acount.schedules_available;
    })
  }

  guardarHorario(horarios: any) {
    this.horarios = horarios;
    this._schedule.saveScheduleNews({schedules_available:horarios}, this.id).subscribe(res => this.getSchedule());
  }
}
