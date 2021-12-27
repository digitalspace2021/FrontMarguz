import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { BuscadorComponent } from './containers/buscador/buscador.component';
import { PerfilProfesorComponent } from './containers/perfil-profesor/perfil-profesor.component';


@NgModule({
  declarations: [
    PublicComponent,
    BuscadorComponent,
    PerfilProfesorComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
