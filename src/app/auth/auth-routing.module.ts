import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

import { LoginComponent } from './containers/login/login.component';
import { RegistroEstudianteComponent } from './containers/registro-estudiante/registro-estudiante.component';
import { RegistroProfesorComponent } from './containers/registro-profesor/registro-profesor.component';
import { RegistroComponent } from './containers/registro/registro.component';
import { ResetearContrasenaComponent } from './containers/resetear-contrasena/resetear-contrasena.component';
import { RestaurarContrasenaComponent } from './containers/restaurar-contrasena/restaurar-contrasena.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'registro',
        component: RegistroComponent,
      },
      {
        path: 'registro/estudiante',
        component: RegistroEstudianteComponent,
      },
      {
        path: 'registro/profesor',
        component: RegistroProfesorComponent,
      },
      {
        path: 'recuperar',
        component: ResetearContrasenaComponent,
      },
      {
        path: 'restaurar',
        component: RestaurarContrasenaComponent,
      },
      {
        path: '**',
        redirectTo : ""
        
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
