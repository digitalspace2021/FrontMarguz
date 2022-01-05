import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './containers/buscador/buscador.component';
import { PerfilProfesorComponent } from './containers/perfil-profesor/perfil-profesor.component';
import { PoliticasEstudianteComponent } from './containers/politicas-estudiante/politicas-estudiante.component';
import { PoliticasPagoProfesorComponent } from './containers/politicas-pago-profesor/politicas-pago-profesor.component';
import { PoliticasProfesorComponent } from './containers/politicas-profesor/politicas-profesor.component';
import { PublicComponent } from './public.component';

const routes: Routes = [
  { path: '', component: BuscadorComponent },
  { path: 'prefil/:id', component: PerfilProfesorComponent },
  { path: 'politicas/estudiante', component: PoliticasEstudianteComponent },
  { path: 'politicas/profesor', component: PoliticasProfesorComponent },
  { path: 'politicas/pago', component: PoliticasPagoProfesorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
