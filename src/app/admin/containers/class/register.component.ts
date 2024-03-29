import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendar, faMinusCircle, faPaperclip, faPlusCircle, faSave, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { Observable, of, OperatorFunction, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';

import { PublicService } from 'src/app/public/services/public.service';
import { getErrors } from 'src/app/shared/utils/get-errors';
import { global } from 'src/environments/global';

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
    language: any;
    id: any = null;
    public hours = global.hours
    public load: boolean = false;
    public currentUSer: any = JSON.parse(localStorage.getItem('user') as any).user.role;
    interestOrLanguages: any = [];


    searchingEst = false;
    searchFailedEst = false;
    searchingProcedureEst = false;
    searchFailedProcedureEst: boolean = false;
    serviceSelectedEst: any;
    methodSelectedEst: any;

    searchingTea = false;
    searchFailedTea = false;
    searchingProcedureTea = false;
    searchFailedProcedureTea: boolean = false;
    serviceSelectedTea: any;
    methodSelectedTea: any;
    model: any;
    model2: any;


    constructor(private service: PublicService, private route: ActivatedRoute) { }

    ngOnInit(): void {

        this.route.queryParamMap
            .subscribe((params) => {
                let obj: any = { ...params.keys, ...params }
                if (obj.params.id) this.myParams = obj.params.id
            },
                err => console.log(err)
            );

        if (this.myParams != 0 && this.myParams != undefined) this.searchLesson()
    }

    getSchedule(id: any) {
        this.idTeacher = id
        this.service.getSchedule(this.idTeacher).subscribe((data: any) => {
            this.horarios = data[0].teacherSchedulesAvailable
            this.interestOrLanguages = data[0].interestOrLanguages
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
        this.total = this.price * this.horarios.length * this.count
    }

    save(): any {

        this.load = true;

        let formData = new FormData

        if (String(this.language) == 'undefined') { this.openError('Es necesario seleccionar un Idioma'); this.load = false; return false; }

        formData.append('teacher_id', String(this.idTeacher));
        formData.append('student_id', String(this.idStudent));
        formData.append('amount', String(this.total));
        formData.append('description', String(this.description));
        formData.append('quantity', String(this.count));
        formData.append('language', String(this.language));
        formData.append('email', 'emailfalse@gmail.com');

        this.horarios.forEach((elements: any, index: any) => {

            formData.append('schedules_available[' + index + '][day]', elements.day
            );
            formData.append('schedules_available[' + index + '][start]', elements.startTime
            );
            formData.append('schedules_available[' + index + '][end]', elements.endTime
            );

            formData.append('schedules_available[' + index + '][teacherDescription]', elements.teacherDescription);
            formData.append('schedules_available[' + index + '][status]', elements.status);


        });


        this.service
            .saveClass(formData, this.id)
            .then((resp: any) => {
                if (resp.code == 201) {
                    this.openConfirm();
                    this.load = false;

                } else {

                    this.openError(resp.message);
                    this.load = false;

                }
            })
            .catch((e) => { this.openError(getErrors(e)); this.load = false; });

    }


    searchLesson() {
        this.service
            .searchLesson2(this.myParams)
            .then((resp: any) => {

                let data = resp.result
                this.horarios = data.lesson_schedules
                this.price = data.amount
                this.total = data.amount
                this.count = data.quantity
                this.idStudent = data.student_id
                this.idTeacher = data.teacher_id
                this.student = data.student
                this.teacher = data.teacher
                this.model = data.student
                this.model2 = data.teacher
                this.interestOrLanguages = data.teacher.interest_or_languages
                this.description = data.description
                this.language = data.language ?? 1
                this.id = data.id

            })
            .catch((e) => console.log(e));
        // .catch((e) => this.openError(getErrors(e)));
    }


    searchEst: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => this.searchingEst = true),
            switchMap((term: any) =>
                this.functionEst(term).pipe(
                    tap(() => this.searchFailedEst = false),
                    catchError(() => {
                        this.searchFailedEst = true;
                        return of([]);
                    }))

            ),
            tap(() => this.searchingEst = false)
        )

    InputSearchEst = (x: { name: string, lastname: string }) => {
        return x.name + ' ' + x.lastname
    };

    functionEst(term: string) {
        let methods = [
            this.service.searchTearcherPost(term),
            this.service.searchStudentPost(term),
        ]

        return methods[1]
    }

    selectedItemEst($e: any) {
        console.log($e);
        this.getStudenId($e?.item?.id)
        // this.prop.emit($e?.item?.id)
        // this.price.emit($e?.item)
    }


    searchTea: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => this.searchingTea = true),
            switchMap((term: any) =>
                this.functionTea(term).pipe(
                    tap(() => this.searchFailedTea = false),
                    catchError(() => {
                        this.searchFailedTea = true;
                        return of([]);
                    }))

            ),
            tap(() => this.searchingTea = false)
        )

    InputSearchTea = (x: { name: string, lastname: string }) => {
        return x.name + ' ' + x.lastname
    };

    functionTea(term: string) {
        let methods = [
            this.service.searchTearcherPost(term),
            this.service.searchStudentPost(term),
        ]

        return methods[0]
    }

    selectedItemTea($e: any) {
        this.getSchedule($e?.item?.id);
        this.getPrice($e?.item)
        // this.prop.emit($e?.item?.id)
        // this.price.emit($e?.item)
    }



    openConfirm() {
        this.isRegistroExitoso = true;
    }

}
