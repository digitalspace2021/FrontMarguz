import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { PublicService } from './../../services/public.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import eslocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.scss'],
})
export class PerfilProfesorComponent implements OnInit {
  public host = environment.media;
  profesor!: any;
  id: number = 0;
  auth: boolean = false;
  calendarOptions!: CalendarOptions;

  constructor(
    private publicsv: PublicService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {
    this.actRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getscheduled() {
    if (this.id) {
      this.publicsv.getScheduledPublic(this.id).subscribe((data: any) => {
        let schedules = data.result[0]['teacherSchedulesAvailable'];
        console.log(schedules);
        this.calendarOptions = {
          plugins: [timeGridPlugin],
          initialView: 'timeGridWeek',
          locale: eslocale,
          businessHours: this.convertTime(schedules),
        };
      });
    }
  }

  convertTime(schedules: any): any {
    let convertSchedules: any[] = [];
    schedules.forEach((element: any) => {
      convertSchedules.push({
        daysOfWeek: [this.convertDayWeekNumber(element.day)],
        startTime: element.startTime,
        endTime: element.endTime,
      });
    });

    return convertSchedules;
  }

  convertDayWeekNumber(day: string): number {
    switch (day) {
      case 'Lunes':
        return 1;
      case 'Martes':
        return 2;
      case 'Miercoles':
        return 3;
      case 'Jueves':
        return 4;
      case 'Viernes':
        return 5;
      case 'Sabado':
        return 6;
      case 'Domingo':
        return 7;
      default:
        return 0;
    }
  }

  getProfesor() {
    if (this.id) {
      this.publicsv.getUsuarioTeacher(this.id).subscribe((data: any) => {
        try {
          this.profesor = data.result;
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.getscheduled();
    this.getProfesor();
    let user = localStorage.getItem('user') || undefined;
    if (user) {
      this.auth = true;
    }
  }

  getConvertDayToNumber(day: string): number {
    let value = 0;
    switch (day) {
      case 'lunes':
        value = 1;
        break;
      case 'martes':
        value = 2;
        break;
      case 'miércoles':
        value = 3;
        break;
      case 'jueves':
        value = 4;
        break;
      case 'viernes':
        value = 5;
        break;
      case 'sábado':
        value = 6;
        break;
      case 'domingo':
        value = 7;
        break;
    }
    return value;
  }

  contratar() {
    this.router.navigate([`public/payment/${this.id}`]);
  }
}
