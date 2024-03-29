import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/guards/admin.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { EstudianteGuard } from './auth/guards/estudiante.guard';
import { ProfesorGuard } from './auth/guards/profesor.guard';

const routes: Routes = [
  {
    path: 'estudiantes',
    loadChildren: () =>
      import('./estudiantes/estudiantes.module').then(
        (m) => m.EstudiantesModule
      ),
    canActivate: [AuthGuard, EstudianteGuard],
  },
  {
    path: 'profesores',
    loadChildren: () =>
      import('./profesores/profesores.module').then((m) => m.ProfesoresModule),
    canActivate: [AuthGuard, ProfesorGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
