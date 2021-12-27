import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { EditarMateriaComponent } from './components/editar-materia/editar-materia.component';
import { AgregarMateriaComponent } from './components/agregar-materia/agregar-materia.component';
import { BorrarComponent } from './components/borrar/borrar.component';
import { HabilitarComponent } from './components/habilitar/habilitar.component';
import { DeshabilitarComponent } from './components/deshabilitar/deshabilitar.component';
import { GuardadoComponent } from './components/guardado/guardado.component';
import { AgregarEstudianteComponent } from './containers/agregar-estudiante/agregar-estudiante.component';
import { EditarEstudianteComponent } from './containers/editar-estudiante/editar-estudiante.component';
import { ListaUsuariosComponent } from './containers/lista-usuarios/lista-usuarios.component';
import { ListaMateriasComponent } from './containers/lista-materias/lista-materias.component';
import { ListaClasesComponent } from './containers/lista-clases/lista-clases.component';
import { EditarProfesorComponent } from './containers/editar-profesor/editar-profesor.component';
import { EditarClaseComponent } from './containers/editar-clase/editar-clase.component';
import { EditarHorarioComponent } from './containers/editar-horario/editar-horario.component';


@NgModule({
  declarations: [
    AdminComponent,
    EditarMateriaComponent,
    AgregarMateriaComponent,
    BorrarComponent,
    HabilitarComponent,
    DeshabilitarComponent,
    GuardadoComponent,
    AgregarEstudianteComponent,
    EditarEstudianteComponent,
    ListaUsuariosComponent,
    ListaMateriasComponent,
    ListaClasesComponent,
    EditarProfesorComponent,
    EditarClaseComponent,
    EditarHorarioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
