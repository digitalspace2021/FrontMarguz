import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './containers/buscador/buscador.component';
import { CalendarioComponent } from './containers/calendario/calendario.component';
import { PerfilComponent } from './containers/perfil/perfil.component';
import { EstudiantesComponent } from './estudiantes.component';

const routes: Routes = [{ path: '', component: EstudiantesComponent,
children: [
  {
    path: '', component: PerfilComponent
  },
  {
    path: 'calendario', component: CalendarioComponent
  },
  {
    path: 'buscador', component: BuscadorComponent
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
