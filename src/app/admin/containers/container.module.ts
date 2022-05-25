import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
import { ListAdminComponent } from './list-admin/list-admin.component';
import { PublicModule } from 'src/app/public/public.module';
import { RegisterComponent } from './class/register.component';
import { FormsModule } from '@angular/forms';
import { ListaPagosComponent } from './lista-pagos/lista-pagos.component';
import { PublicService } from 'src/app/public/services/public.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';


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
    RegisterComponent,
    ListaPagosComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ComponentModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AuthModule,
    NgxPaginationModule,
    NgbTypeaheadModule,
    SharedModule,
    PublicModule,
    FormsModule
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
  providers: [PublicService],
})
export class ContainerModule { }
