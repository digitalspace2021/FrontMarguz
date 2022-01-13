import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'estudiantes',
    loadChildren: () =>
      import('./estudiantes/estudiantes.module').then(
        (m) => m.EstudiantesModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'profesores',
    loadChildren: () =>
      import('./profesores/profesores.module').then((m) => m.ProfesoresModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
      canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
