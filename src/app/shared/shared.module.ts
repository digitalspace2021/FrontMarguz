import { FooterAppComponent } from './components/footer-app/footer-app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponent } from './shared.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorComponent } from './components/error/error.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedRoutingModule } from './shared-routing.module';
import { PublicModule } from '../public/public.module';
@NgModule({
  declarations: [
    SharedComponent,
    LoaderComponent,
    ErrorComponent,
    ConfirmComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterAppComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PublicModule,
    //SharedRoutingModule
  ],
  exports: [
    LoaderComponent,
    ErrorComponent,
    ConfirmComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterAppComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
