import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { PublicService } from './../../services/public.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import eslocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.scss'],
})
export class PerfilProfesorComponent implements OnInit {
  public host = environment.media;
  profesor: any;
  id: number = 0;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: eslocale,
    events: [{}],
  };

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

  ngOnInit(): void {
    if (this.id) {
      this.publicsv.getUsuarioTeacher(this.id).subscribe((data: any) => {
        try {
          this.profesor = data.result;
          console.log(this.profesor);
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }
}
