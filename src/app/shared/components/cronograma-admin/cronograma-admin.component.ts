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
  selector: 'app-cronograma-admin',
  templateUrl: './cronograma-admin.component.html',
  styleUrls: ['./cronograma-admin.component.scss'],
})

export class CronogramaAdminComponent implements OnInit {
  // @Input() inicioRange? : Date;
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
  data: any;
  load: boolean = false;
  quantity!: number;
  isConfirm: boolean = false;
  btnName: string = 'Aprobar';
  disabled: boolean = false;
  calendarEvents: any;


  calendarWeekends: any;


  Id_Dependencia = 1;

  Departamentos: any = [];
  Municipios: any = [];
  Actividades: Array<any> = [];


  Ver: boolean = false;
  ver: number = 0;
  FuncionariosSele: any[] = [];


  cliente_seleccionado: any = '';
  funcionario_seleccionado: any = '';
  Funcionarios: any[] = [];

  alertOption: any = {};
  private eventoActividad: any;
  eventsModel: any;

  constructor(
    private datePipe: DatePipe,
    private service: PublicService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.TypeUser = JSON.parse(localStorage.getItem('user') as any).user.role;
    this.setDates(new Date());
  }


  searchschedules(id: any) {
    this.load = true
    this.service
      .searchschedules(id)
      .then((resp: any) => {
        this.horarios = resp.result
        this.load = false
      })
      .catch((e) => console.log(e));

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
    this.finRange.setDate(this.finRange.getDate() + 5);
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
      console.log('click');
    }
  }

  backRange() {
    if (this.inicioRange) {
      let date = new Date(this.inicioRange);
      date.setDate(date.getDate() - 1);
      this.setDates(date);
    }
  }
  approve() {
    this.disabled = true
    this.btnName = 'Enviando...'
    this.service
      .approveLesson(this.selectedId)
      .then((resp: any) => {
        this.isConfirm = true;
        this.btnName = 'Aprobar'
        this.disabled = false
        this.closedModal()
      })
      .catch((e) => console.log(e));
  }

  closeConfirm() {
    this.isConfirm = false;
  }


  goEdit() {
    this.router.navigate(['admin/class-create'], { queryParams: { id: this.selectedLessonId }, queryParamsHandling: 'merge' });
  }
}
