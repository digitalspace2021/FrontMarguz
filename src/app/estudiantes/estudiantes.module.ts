import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { EstudiantesComponent } from './estudiantes.component';
import { DetalleClaseComponent } from './components/detalle-clase/detalle-clase.component';
import { CalendarioComponent } from './containers/calendario/calendario.component';
import { PerfilComponent } from './containers/perfil/perfil.component';
import { HeaderEstudianteComponent } from './components/header-estudiante/header-estudiante.component';
import { BuscadorComponent } from './containers/buscador/buscador.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UtilsModule } from '../shared/utils/utils.module';


@NgModule({
  declarations: [
    EstudiantesComponent,
    DetalleClaseComponent,
    CalendarioComponent,
    PerfilComponent,
    HeaderEstudianteComponent,
    BuscadorComponent
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    SharedModule,
    FontAwesomeModule,
    EstudiantesRoutingModule,
    ReactiveFormsModule,
    UtilsModule
  ]
})
export class EstudiantesModule { }
