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

  @ViewChild(ModalBasicComponent) modal!: ModalBasicComponent


  constructor(private datePipe: DatePipe, private service: PublicService) { }

  ngOnInit(): void {
    this.setDates(new Date());
    this.searchLesson()
  }

  searchLesson() {

    this.horarios = [{
      "id": 40,
      "day": "nunes",
      "start_hour": "8:00",
      "end_hour": "14:00pm",
      "lesson_id": 4,
      "created_at": "2022-04-22T00:46:40.000000Z",
      "updated_at": "2022-04-22T00:46:40.000000Z"
    },
    {
      "id": 41,
      "day": "martes",
      "start_hour": "8:00",
      "end_hour": "14:00pm",
      "lesson_id": 4,
      "created_at": "2022-04-22T00:46:40.000000Z",
      "updated_at": "2022-04-22T00:46:40.000000Z"
    },
    {
      "id": 42,
      "day": "miércoles",
      "start_hour": "12:00",
      "end_hour": "14:00pm",
      "lesson_id": 4,
      "created_at": "2022-04-22T00:46:40.000000Z",
      "updated_at": "2022-04-22T00:46:40.000000Z"
    },
    {
      "id": 43,
      "day": "jueves",
      "start_hour": "8:00",
      "end_hour": "14:00pm",
      "lesson_id": 4,
      "created_at": "2022-04-22T00:46:40.000000Z",
      "updated_at": "2022-04-22T00:46:40.000000Z"
    },
    {
      "id": 44,
      "day": "viernes",
      "start_hour": "8:00",
      "end_hour": "11:00pm",
      "lesson_id": 4,
      "created_at": "2022-04-22T00:46:40.000000Z",
      "updated_at": "2022-04-22T00:46:40.000000Z"
    }]

    // this.service
    //   .searchLesson(4)
    //   .then((resp: any) => {

    //     let data = resp.result
    //     this.horarios = data.lesson_schedules
    //     console.log(this.horarios)

    // this.price = data.amount
    // this.total = data.amount
    // this.count = 1
    // this.idStudent = data.student_id
    // this.idTeacher = data.teacher_id
    // this.student = data.student
    // this.teacher = data.teacher
    // this.description = data.description
    // this.id = data.id

    // })
    // .catch((e) => console.log(e));
    // .catch((e) => this.openError(getErrors(e)));
  }

  showModal() {
    this.service
      .searchLesson(4)
      .then((resp: any) => {
        console.log(resp);
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
}
