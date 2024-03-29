import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './containers/calendario/calendario.component';
import { HorarioComponent } from './containers/horario/horario.component';
import { PerfilComponent } from './containers/perfil/perfil.component';
import { ProfesoresComponent } from './profesores.component';

const routes: Routes = [{ path: '', component: ProfesoresComponent,
children: [
  {
    path: 'perfil', component: PerfilComponent
  },
  {
    path: 'horario', component: HorarioComponent
  },
  {
    path: '', component: CalendarioComponent
  },
  {
    path: '**',
    redirectTo : ""
    
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesoresRoutingModule { }
