import {
  Component,
  Input, OnInit, TemplateRef, ViewChild
} from '@angular/core';
import { DatePipe, formatNumber } from '@angular/common';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { PublicService } from 'src/app/public/services/public.service';
import { ModalBasicComponent } from '../modal-basic/modal-basic.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.scss'],
})
export class CronogramaComponent implements OnInit {
  @Input() tipoUsuario: string = "0";
  inicioRange?: Date;
  finRange?: Date;
  range: any;
  backRow = faChevronLeft;
  nextRow = faChevronRight;
  horarios: any;

  selectedId = 0;
  selectedTeacherDescription = null;
  selectedstartTime = null;
  selectedendTime = null;
  selectedDay = null;
  selectedLessonId = null;

  @ViewChild(ModalBasicComponent) modal!: ModalBasicComponent
  TypeUser: any;


  constructor(
    private datePipe: DatePipe,
    private service: PublicService,
    private router: Router) { }

  ngOnInit(): void {
    this.TypeUser = JSON.parse(localStorage.getItem('user') as any).user.role;
    this.setDates(new Date());
    this.searchLesson()
  }

  verify(dates: any, day: any) {

    console.log([dates, day]);

    return false;

  }

  searchLesson() {
    this.service
      .getLessons()
      .then((resp: any) => {
        let data = resp.result
        this.horarios = data
        console.log(this.horarios)
      })
  }

  showModal(lesson: any) {
    this.service
      .searchLesson(lesson.id)
      .then((resp: any) => {

        this.selectedId = resp.result.id;
        this.selectedTeacherDescription = resp.result.teacherDescription;
        this.selectedstartTime = resp.result.startTime;
        this.selectedendTime = resp.result.endTime;
        this.selectedDay = resp.result.day;
        this.selectedLessonId = resp.result.lesson_id;

        this.modal.show()

      })
      .catch((e) => console.log(e));
  }

  closedModal() {
    this.modal.hide()
  }

  setDates(date: Date) {
    this.inicioRange = new Date(date);
    this.finRange = new Date(this.inicioRange);
    this.finRange.setDate(this.finRange.getDate() + 6);
    this.range = [];
    for (let d = new Date(this.inicioRange); d <= this.finRange; d.setDate(d.getDate() + 1)) {
      this.range.push(new Date(d));
    }
  }
  nextRange() {
    if (this.inicioRange) {
      let date = new Date(this.inicioRange);
      date.setDate(date.getDate() + 1);
      this.setDates(date);
    }
    /*     let rangeDays: any = document.getElementsByClassName('rangeDays');
    let fiz: any = this.inicioRange;
    let fde: any = this.finRange;

    let fizParse: any = parseInt(fiz.textContent);
    fizParse = fizParse + 1;
    fizParse = fizParse.toString();
    fiz.innerHTML = fizParse;

    let fdeParse: any = parseInt(fde.textContent);
    fdeParse = fdeParse + 1;
    fdeParse = fdeParse.toString();
    fde.innerHTML = fdeParse;

    for (let i = 0; i < rangeDays.length; i++) {
      let valore = rangeDays[i].textContent;
      let valoresParse = parseInt(valore);
      valoresParse = valoresParse + 1;
      rangeDays[i].innerHTML = valoresParse;
    } */
  }

  backRange() {
    if (this.inicioRange) {
      let date = new Date(this.inicioRange);
      date.setDate(date.getDate() - 1);
      this.setDates(date);
    }
    /*     let rangeDays: any = document.getElementsByClassName('rangeDays');

    let fiz: any = this.inicioRange;
    let fde: any = this.finRange;

    let fizParse: any = parseInt(fiz.textContent);
    fizParse = fizParse - 1;
    fizParse = fizParse.toString();
    fiz.innerHTML = fizParse;

    let fdeParse: any = parseInt(fde.textContent);
    fdeParse = fdeParse - 1;
    fdeParse = fdeParse.toString();
    fde.innerHTML = fdeParse;

    for (let i = 0; i < rangeDays.length; i++) {
      let valore = rangeDays[i].textContent;
      let valoresParse = parseInt(valore);
      valoresParse = valoresParse - 1;
      rangeDays[i].innerHTML = valoresParse;
    } */
  }
  approve() {
    this.service
      .approveLesson(this.selectedId)
      .then((resp: any) => {
        this.closedModal()
        console.log(resp);
      })
      .catch((e) => console.log(e));
  }


  goEdit() {
    this.router.navigate(['admin/class-create'], { queryParams: { id: this.selectedLessonId }, queryParamsHandling: 'merge' });
    // this.service
    //   .searchLesson()
    //   .then((resp: any) => {
    console.log(this.selectedId);
    // })
    // .catch((e) => console.log(e));
  }
}
