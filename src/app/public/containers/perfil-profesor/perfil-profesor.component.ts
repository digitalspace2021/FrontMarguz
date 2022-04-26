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

  getProfesor() {
    if (this.id) {
      this.publicsv.getUsuarioTeacher(this.id).subscribe((data: any) => {
        try {
          this.profesor = data.result;
          this.calendarOptions = {
            plugins: [timeGridPlugin],
            initialView: 'timeGridWeek',
            locale: eslocale,
            events: [
              {
                start: '10:00', // hora final
                end: '17:00', // hora inicial
                backgroundColor: '#FFFFFF',
              },
            ],
          };
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.getProfesor();
    let user = localStorage.getItem('user') || undefined;
    if (user) {
      this.auth = true;
    }
  }
}
