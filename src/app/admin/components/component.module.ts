import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { GuardadoComponent } from './guardado/guardado.component';
import { DeshabilitarComponent } from './deshabilitar/deshabilitar.component';
import { HabilitarComponent } from './habilitar/habilitar.component';
import { BorrarComponent } from './borrar/borrar.component';
import { AgregarMateriaComponent } from './agregar-materia/agregar-materia.component';
import { EditarMateriaComponent } from './editar-materia/editar-materia.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    EditarMateriaComponent,
    AgregarMateriaComponent,
    BorrarComponent,
    HabilitarComponent,
    DeshabilitarComponent,
    GuardadoComponent,
    HeaderAdminComponent

  ],
  imports: [
    CommonModule, FontAwesomeModule
  ],
  exports : [
    EditarMateriaComponent,
    AgregarMateriaComponent,
    BorrarComponent,
    HabilitarComponent,
    DeshabilitarComponent,
    GuardadoComponent,
    HeaderAdminComponent
  ]
})
export class ComponentModule { }
