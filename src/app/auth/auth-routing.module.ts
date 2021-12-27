import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

import { LoginComponent } from './containers/login/login.component';
import { RegistroEstudianteComponent } from './containers/registro-estudiante/registro-estudiante.component';
import { RegistroProfesorComponent } from './containers/registro-profesor/registro-profesor.component';

const routes: Routes = [{ 
  path: '', component: LoginComponent 
},{ 
  path: 'registro/estudiante', component: RegistroEstudianteComponent 
},{ 
  path: 'registro/profesor', component: RegistroProfesorComponent 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
