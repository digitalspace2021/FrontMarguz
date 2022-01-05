import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorComponent } from './components/error/error.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    //SharedComponent,
    LoaderComponent,
    ErrorComponent,
    ConfirmComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    //SharedRoutingModule
  ],
  exports: [
    LoaderComponent,
    ErrorComponent,
    ConfirmComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
