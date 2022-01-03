import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ContainerModule } from './containers/container.module';
import { ComponentModule } from './components/component.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ContainerModule,
    ComponentModule,
    FontAwesomeModule,
    SharedModule,
  ],
})
export class AdminModule {}
