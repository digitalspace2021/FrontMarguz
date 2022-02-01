import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './containers/buscador/buscador.component';
import { CalendarioComponent } from './containers/calendario/calendario.component';
import { PerfilComponent } from './containers/perfil/perfil.component';
import { EstudiantesComponent } from './estudiantes.component';

const routes: Routes = [{ path: '', component: EstudiantesComponent,
children: [
  {
    path: 'perfil', component: PerfilComponent
  },
  {
    path: '', component: CalendarioComponent
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
