import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HorarioService } from './horario.service';
import { UsuarioService } from '../../../admin/services/usuario.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
  @ViewChild('ModalClose') ModalClose?: ElementRef;
  isRegistroExitoso: boolean = false;
  constructor(
              private _schedule: HorarioService,
              private _user: UsuarioService,
              private route: Router,
              private location: Location
            ) {}

  ngOnInit(): void {
    this.urlId = new URL(location.href).searchParams.get('id');
    this.dataUsuario = localStorage.getItem('user');
    this.dataUsuario = JSON.parse(this.dataUsuario);
    this.role = this.dataUsuario?.user?.role;
    this.getSchedule();
  }

  openConfirmRegistro() {
    this.isRegistroExitoso = true;
 }
 closeConfirmRegistro() {
  this.isRegistroExitoso = false;
  this.location.back()
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
    this._schedule.saveScheduleNews({schedules_available:horarios}, (this.role == 'Admin' ? this.urlId : this.id)).subscribe(res => {
      this.isRegistroExitoso = true;
      this.getSchedule();
    });
  }
}
