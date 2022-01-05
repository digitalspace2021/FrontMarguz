import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { BuscadorComponent } from './containers/buscador/buscador.component';
import { PerfilProfesorComponent } from './containers/perfil-profesor/perfil-profesor.component';
import { PoliticasProfesorComponent } from './containers/politicas-profesor/politicas-profesor.component';
import { PoliticasEstudianteComponent } from './containers/politicas-estudiante/politicas-estudiante.component';
import { PoliticasPagoProfesorComponent } from './containers/politicas-pago-profesor/politicas-pago-profesor.component';


@NgModule({
  declarations: [
    PublicComponent,
    BuscadorComponent,
    PerfilProfesorComponent,
    PoliticasProfesorComponent,
    PoliticasEstudianteComponent,
    PoliticasPagoProfesorComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
