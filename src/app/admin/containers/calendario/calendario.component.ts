import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from 'src/app/public/services/public.service';
import { CronogramaAdminComponent } from 'src/app/shared/components/cronograma-admin/cronograma-admin.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {


  fecha?: Date | null;
  public teacher: any = null
  public student: any = null
  public data: any = null
  public lessons: any = [];

  @ViewChild(CronogramaAdminComponent) modal!: CronogramaAdminComponent


  constructor(private service: PublicService, private router: Router) { }

  ngOnInit(): void {
  }


  goToProfile(user: any) {

    let url = null

    if (user.interest == undefined) url = 'profesores/perfil'
    if (user.languages == undefined) url = 'estudiantes/perfil'

    this.router.navigate([url], {
      queryParams: { id: user.id },
      queryParamsHandling: 'merge',
    });
  }

  searchUser() {

    if (this.student != null && this.student != '')
      this.service.searchStudentPost(this.student).subscribe((res => this.data = res))


    if (this.student == null || this.student == '')
      this.service.searchTearcherPost(this.teacher).subscribe((res => this.data = res))
  }

  showCalendar(user: any) {

    if (user.lessonsStudent != undefined) this.lessons = user.lessonsStudent;
    if (user.lessonsTeacher != undefined) this.lessons = user.lessonsTeacher;

    this.modal.data = this.lessons;
    this.modal.searchschedules(user.id);


  }

}

