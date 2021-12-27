import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesoresRoutingModule } from './profesores-routing.module';
import { ProfesoresComponent } from './profesores.component';
import { EditarMateriaComponent } from './components/editar-materia/editar-materia.component';
import { AgregarMateriaComponent } from './components/agregar-materia/agregar-materia.component';
import { BorrarMateriaComponent } from './components/borrar-materia/borrar-materia.component';
import { DetalleClaseComponent } from './components/detalle-clase/detalle-clase.component';
import { EditarPagoComponent } from './components/editar-pago/editar-pago.component';
import { CalendarioComponent } from './containers/calendario/calendario.component';
import { PerfilComponent } from './containers/perfil/perfil.component';
import { HorarioComponent } from './containers/horario/horario.component';


@NgModule({
  declarations: [
    ProfesoresComponent,
    EditarMateriaComponent,
    AgregarMateriaComponent,
    BorrarMateriaComponent,
    DetalleClaseComponent,
    EditarPagoComponent,
    CalendarioComponent,
    PerfilComponent,
    HorarioComponent
  ],
  imports: [
    CommonModule,
    ProfesoresRoutingModule
  ]
})
export class ProfesoresModule { }
