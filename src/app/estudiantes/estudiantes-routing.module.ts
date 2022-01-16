import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './containers/perfil/perfil.component';
import { EstudiantesComponent } from './estudiantes.component';

const routes: Routes = [
  { path: '', 
    component: EstudiantesComponent, 
    children : [{
      path : 'editar/perfil',
      component : PerfilComponent
    }]    
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
