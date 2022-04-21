import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendar, faMinusCircle, faPaperclip, faPlusCircle, faSave, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { PublicService } from 'src/app/public/services/public.service';
import { getErrors } from 'src/app/shared/utils/get-errors';

@Component({
    selector: 'app-editar-clase',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],

})
export class RegisterComponent implements OnInit {

    user = faUserPlus;
    icon = faPlusCircle;
    faPaperclip = faPaperclip;
    calendar = faCalendar;
    plusIcon = faPlusCircle;
    minusIcon = faMinusCircle;
    saveIcon = faSave;

    @Output() closeHorario = new EventEmitter<string>();


    isRegistroExitoso: boolean = false;
    titleConfirm: string = 'Guardando Clase'
    registroExitosoMessage: string =
        'Registro exitoso.';
    isError: boolean = false;
    errorMessage: string = '';

    horarios: Array<any> = [];
    description: string = '';
    price: any;
    total: number = 0;
    count: number = 0;
    idStudent: number = 0;
    idTeacher: number = 0;
    myParams: number = 0;
    student: any;
    teacher: any;
    id: any = null;


    constructor(private service: PublicService, private route: ActivatedRoute) { }

    ngOnInit(): void {

        this.route.queryParamMap
            .subscribe((params) => {
                let obj: any = { ...params.keys, ...params }
                this.myParams = obj.params.id
            });

        if (this.myParams != 0 && this.myParams != undefined) this.searchLesson()
    }

    getSchedule(id: any) {
        this.idTeacher = id
        this.service.getSchedule(this.idTeacher).subscribe((data: any) => {
            this.horarios = data
            this.getTotal()
        })
    }

    getStudenId(id: any) {
        this.idStudent = id
    }

    getPrice(user: any) {
        this.price = user.price
    }

    openError(message: string) {
        this.isError = true;
        this.errorMessage = message;
    }

    closeError() {
        this.isError = false;
        this.errorMessage = '';
    }


    eliminarHorario(e: Event, index: number) {
        this.horarios.splice(index, 1)
        this.getTotal()
    }

    getTotal() {
        console.log('calculing');
        this.total = this.price * this.horarios.length * this.count
    }

    save() {

        let formData = new FormData

        formData.append('teacher_id', String(this.idTeacher));
        formData.append('student_id', String(this.idStudent));
        formData.append('amount', String(this.total));
        formData.append('description', this.description);
        formData.append('quantity', String(this.count));
        formData.append('email', 'emailfalse@gmail.com');

        this.horarios.forEach((elements: any, index: any) => {
            formData.append('schedules_available[' + index + '][day]', elements.day
            );
            formData.append('schedules_available[' + index + '][start]', elements.start_hour
            );
            formData.append('schedules_available[' + index + '][end]', elements.end_hour
            );
        });


        this.service
            .saveClass(formData, this.id)
            .then((resp: any) => {
                if (resp.code == 201) {
                    this.openConfirm();
                } else {
                    this.openError(resp.message);
                }
            })
            .catch((e) => this.openError(getErrors(e)));

    }


    searchLesson() {
        this.service
            .searchLesson(this.myParams)
            .then((resp: any) => {

                let data = resp.result[0]
                this.horarios = data.lesson_schedules
                this.price = data.amount
                this.total = data.amount
                this.count = 1
                this.idStudent = data.student_id
                this.idTeacher = data.teacher_id
                this.student = data.student
                this.teacher = data.teacher
                this.description = data.description
                this.id = data.id

            })
            .catch((e) => this.openError(getErrors(e)));
    }


    openConfirm() {
        this.isRegistroExitoso = true;
    }

}
