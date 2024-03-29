
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { SharedComponent } from './shared.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorComponent } from './components/error/error.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HorarioComponent } from './components/horario/horario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdiomasComponent } from './components/idiomas/idiomas.component';
import { DetalleDePagoComponent } from './components/detalle-de-pago/detalle-de-pago.component';
import { DetalleDeClaseComponent } from './components/detalle-de-clase/detalle-de-clase.component';
import { CronogramaComponent } from './components/cronograma/cronograma.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalBasicComponent } from './components/modal-basic/modal-basic.component';
import { CronogramaAdminComponent } from './components/cronograma-admin/cronograma-admin.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    SharedComponent,
    LoaderComponent,
    ErrorComponent,
    ConfirmComponent,
    HeaderComponent,
    HorarioComponent,
    FooterComponent,
    IdiomasComponent,
    FooterComponent,
    DetalleDePagoComponent,
    DetalleDeClaseComponent,
    CronogramaComponent,
    CronogramaAdminComponent,
    ModalBasicComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    FullCalendarModule,
  ],
  providers: [
    DatePipe
  ],
  exports: [
    LoaderComponent,
    HorarioComponent,
    IdiomasComponent,
    FooterComponent,
    ErrorComponent,
    ConfirmComponent,
    HeaderComponent,
    FooterComponent,
    DetalleDePagoComponent,
    DetalleDeClaseComponent,
    CronogramaComponent,
    CronogramaAdminComponent,
    CronogramaAdminComponent,

  ],
})
export class SharedModule { }
