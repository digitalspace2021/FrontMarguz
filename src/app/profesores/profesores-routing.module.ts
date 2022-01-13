import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './containers/calendario/calendario.component';
import { PerfilComponent } from './containers/perfil/perfil.component';
import { ProfesoresComponent } from './profesores.component';

const routes: Routes = [{ path: '', component: ProfesoresComponent,
children: [
  {
    path: '', component: PerfilComponent
  },
  {
    path: 'calendario', component: CalendarioComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesoresRoutingModule { }
