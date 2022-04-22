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
import { FormsModule } from '@angular/forms';
import { EditarClaseComponent } from './editar-clase/editar-clase.component';
import { RegistroModalComponent } from './registro-modal/registro-modal.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    EditarMateriaComponent,
    AgregarMateriaComponent,
    BorrarComponent,
    HabilitarComponent,
    DeshabilitarComponent,
    GuardadoComponent,
    HeaderAdminComponent,
    EditarClaseComponent,
    RegistroModalComponent
  ],
  imports: [CommonModule, FontAwesomeModule, FormsModule, AuthModule,SharedModule],
  exports: [
    EditarMateriaComponent,
    AgregarMateriaComponent,
    BorrarComponent,
    HabilitarComponent,
    DeshabilitarComponent,
    GuardadoComponent,
    HeaderAdminComponent,
    RegistroModalComponent
  ],
})
export class ComponentModule {}
