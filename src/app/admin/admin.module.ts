import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faSortDown,
  faEdit,
  faUserCheck,
  faWindowClose,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

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
    SharedModule
  ],
})
export class AdminModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSortDown);
    library.addIcons(faEdit);
    library.addIcons(faUserCheck);
    library.addIcons(faWindowClose);
    library.addIcons(faTrashAlt);
  }
}
