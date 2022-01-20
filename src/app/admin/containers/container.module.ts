import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';

import { AgregarEstudianteComponent } from './agregar-estudiante/agregar-estudiante.component';
import { EditarEstudianteComponent } from './editar-estudiante/editar-estudiante.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ListaMateriasComponent } from './lista-materias/lista-materias.component';
import { ListaClasesComponent } from './lista-clases/lista-clases.component';
import { EditarProfesorComponent } from './editar-profesor/editar-profesor.component';
import { EditarClaseComponent } from './editar-clase/editar-clase.component';
import { EditarHorarioComponent } from './editar-horario/editar-horario.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarioComponent } from './calendario/calendario.component';
import { ComponentModule } from '../components/component.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { PerfilComponent } from './perfil/perfil.component';
import { FormRegistroModule } from 'src/app/auth/components/form-registro/form-registro.module';
import { ListAdminComponent } from './list-admin/list-admin.component';

@NgModule({
  declarations: [
    ListAdminComponent,
    AgregarEstudianteComponent,
    EditarEstudianteComponent,
    ListaUsuariosComponent,
    ListaMateriasComponent,
    ListaClasesComponent,
    EditarProfesorComponent,
    EditarClaseComponent,
    EditarHorarioComponent,
    CalendarioComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    ComponentModule,
    FormRegistroModule,
    AuthModule,
    NgxPaginationModule
  ],
  exports: [
    ListAdminComponent,
    AgregarEstudianteComponent,
    EditarEstudianteComponent,
    ListaUsuariosComponent,
    ListaMateriasComponent,
    ListaClasesComponent,
    EditarProfesorComponent,
    EditarClaseComponent,
    EditarHorarioComponent,
  ],
})
export class ContainerModule {}
