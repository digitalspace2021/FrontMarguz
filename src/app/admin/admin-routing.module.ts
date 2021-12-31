import { ListaClasesComponent } from './containers/lista-clases/lista-clases.component';
import { ListAdminComponent } from './containers/list-admin/list-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ListaUsuariosComponent } from './containers/lista-usuarios/lista-usuarios.component';
import { ListaMateriasComponent } from './containers/lista-materias/lista-materias.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'admin-list',
        component : ListAdminComponent
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
        path: '**',
        redirectTo : "admin-list"
        
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
