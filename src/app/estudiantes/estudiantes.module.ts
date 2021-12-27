import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { EstudiantesComponent } from './estudiantes.component';
import { DetalleClaseComponent } from './components/detalle-clase/detalle-clase.component';
import { CalendarioComponent } from './containers/calendario/calendario.component';
import { PerfilComponent } from './containers/perfil/perfil.component';


@NgModule({
  declarations: [
    EstudiantesComponent,
    DetalleClaseComponent,
    CalendarioComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule
  ]
})
export class EstudiantesModule { }
