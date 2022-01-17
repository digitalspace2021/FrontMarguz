import { ListaClasesComponent } from './containers/lista-clases/lista-clases.component';
import { ListAdminComponent } from './containers/list-admin/list-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListaUsuariosComponent } from './containers/lista-usuarios/lista-usuarios.component';
import { ListaMateriasComponent } from './containers/lista-materias/lista-materias.component';
import { EditarEstudianteComponent } from './containers/editar-estudiante/editar-estudiante.component';
import { EditarProfesorComponent } from './containers/editar-profesor/editar-profesor.component';
import { EditarHorarioComponent } from './containers/editar-horario/editar-horario.component';
import { EditarClaseComponent } from './containers/editar-clase/editar-clase.component';
import { CalendarioComponent } from './containers/calendario/calendario.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component : CalendarioComponent
      },
      {
        path: 'admin-usuario',
        component : ListaUsuariosComponent
      },
      {
        path: 'admin-materia',
        component : ListaMateriasComponent
      },
      {
        path: 'admin-clase',
        component : ListaClasesComponent
      },
      {
        path: 'editar-estudiante',
        component : EditarEstudianteComponent
      },
      {
        path: 'editar-profesor',
        component : EditarProfesorComponent
      },
      {
        path: 'editar-horario',
        component : EditarHorarioComponent
      },
      {
        path: 'editar-clase',
        component : EditarClaseComponent
      },
      {
        path: '**',
        redirectTo : "admin-usuario"
        
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
