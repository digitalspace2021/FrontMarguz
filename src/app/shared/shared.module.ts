
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponent } from './shared.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorComponent } from './components/error/error.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedRoutingModule } from './shared-routing.module';
import { PublicModule } from '../public/public.module';
import { HorarioComponent } from './components/horario/horario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdiomasComponent } from './components/idiomas/idiomas.component';
import { DetalleDePagoComponent } from './components/detalle-de-pago/detalle-de-pago.component';
import { DetalleDeClaseComponent } from './components/detalle-de-clase/detalle-de-clase.component';
import { CronogramaComponent } from './components/cronograma/cronograma.component';
import { EditarClaseComponent } from './components/editar-clase/editar-clase.component';
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
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    //SharedRoutingModule
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
  ],
})
export class SharedModule {}
