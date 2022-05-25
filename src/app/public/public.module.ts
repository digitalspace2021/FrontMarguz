import { ProfesoresModule } from './../profesores/profesores.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { BuscadorComponent } from './containers/buscador/buscador.component';
import { PerfilProfesorComponent } from './containers/perfil-profesor/perfil-profesor.component';
import { PoliticasProfesorComponent } from './containers/politicas-profesor/politicas-profesor.component';
import { PoliticasEstudianteComponent } from './containers/politicas-estudiante/politicas-estudiante.component';
import { PoliticasPagoProfesorComponent } from './containers/politicas-pago-profesor/politicas-pago-profesor.component';
import { HeaderPublicComponent } from './components/header-public/header-public.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicService } from './services/public.service';
import { SearchComponent } from './components/search/search.component';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilsModule } from '../shared/utils/utils.module';

@NgModule({
  declarations: [
    PublicComponent,
    BuscadorComponent,
    PerfilProfesorComponent,
    PoliticasProfesorComponent,
    PoliticasEstudianteComponent,
    PoliticasPagoProfesorComponent,
    HeaderPublicComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    UtilsModule,
    HttpClientModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    NgxPaginationModule,
    FullCalendarModule,
    ProfesoresModule,
  ],
  providers: [PublicService],
  exports: [HeaderPublicComponent, SearchComponent],
})
export class PublicModule { }
