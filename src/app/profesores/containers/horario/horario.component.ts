import { Component, OnInit } from '@angular/core';
import { HorarioService } from './horario.service';
import { UsuarioService } from '../../../admin/services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horario-contenedor',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss'],
})
export class HorarioComponent implements OnInit {
  horarios: any;
  id:number = 0;
  urlId:any;
  role:string = '';
  dataUsuario:any;
  constructor( private _schedule: HorarioService, private _user: UsuarioService) {}

  ngOnInit(): void {
    this.urlId = new URL(location.href).searchParams.get('id');
    this.dataUsuario = localStorage.getItem('user');
    this.dataUsuario = JSON.parse(this.dataUsuario);
    this.role = this.dataUsuario?.user?.role;
    this.getSchedule();
  }

  getSchedule(){
    if (this.role == 'Admin') {
      this._user.getUsuario(this.urlId)
      .subscribe( (res:any) => {
        this.id = res.result.id;
        this.horarios = res.result.acount.schedules_available;
      })
    } else {
      this._user.getUsuario()
      .subscribe( (res:any) => {
        this.id = res.result.id;
        this.horarios = res.result.acount.schedules_available;
      })
    }
  }

  guardarHorario(horarios: any) {
    this.horarios = horarios;
    this._schedule.saveScheduleNews({schedules_available:horarios}, (this.role == 'Admin' ? this.urlId : this.id)).subscribe(res => this.getSchedule());
  }
}
